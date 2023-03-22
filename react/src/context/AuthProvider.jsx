import { createContext, useState, useCallback, useEffect, useMemo, useContext } from "react";
import * as gebruikerApi from "../api/gebruiker";
import * as api from "../api/index";
import * as rolTemplateApi from "../api/dashboard/rolTemplate";
import * as gebruikerTemplateApi from "../api/dashboard/gebruikerTemplate";
import config from "../config.json";
import { Buffer } from "buffer";

const JWT_TOKEN_KEY = config.token_key;
const LOCAL_STORAGE_GEBRUIKER_ID = config.gebruiker_ID;
const LOCAL_STORAGE_GEBRUIKER_ROL = config.gebruiker_rol;
const LS_GEBRUIKER_TEMPLATE = config.template_gebruiker;
const LS_ROL_TEMPLATE = config.template_rol;

const GebruikerContext = createContext();

function parseJwt(token) {
  if (!token) return {};
  const base64Url = token.split(".")[1];
  const payload = Buffer.from(base64Url, "base64");
  const jsonPayload = payload.toString("ascii");
  return JSON.parse(jsonPayload);
}

function parseExp(exp) {
  if (!exp) return null;
  if (typeof exp !== "number") exp = Number(exp);
  if (isNaN(exp)) return null;
  return new Date(exp * 1000);
}

export const useGebruiker = () => useContext(GebruikerContext);

export const useSession = () => {
  const { loading, error, token, gebruiker, hasRole, ready, setSession } = useGebruiker();
  return {
    loading,
    error,
    token,
    gebruiker,
    isAuthed: Boolean(token),
    isMvoCoordinator: hasRole("mvocoordinator"),
    isManager: hasRole("manager"),
    ready,
    setSession,
  };
};

export const useLogin = () => {
  const { login } = useGebruiker();
  return login;
};

export const useLogout = () => {
  const { logout } = useGebruiker();
  return logout;
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [gebruiker, setGebruiker] = useState(null);
  const [ready, setReady] = useState(false);

  const setSession = useCallback(async (token, gebruiker) => {
    const { exp, ID } = parseJwt(token);
    const expiry = parseExp(exp);
    const validToken = expiry >= new Date();

    if (validToken) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_GEBRUIKER_ID);
      localStorage.removeItem(LOCAL_STORAGE_GEBRUIKER_ROL);
      localStorage.removeItem(LS_GEBRUIKER_TEMPLATE);
      localStorage.removeItem(LS_ROL_TEMPLATE);
      token = null;
    }

    api.setAuthToken(token);
    setToken(token);
    setReady(token && validToken);
    if (!gebruiker && validToken) {
      gebruiker = await gebruikerApi.getGebruikerByID(ID);
    }
    setGebruiker(gebruiker);
    if (gebruiker) {
      localStorage.setItem(LOCAL_STORAGE_GEBRUIKER_ID, gebruiker.ID);
      localStorage.setItem(LOCAL_STORAGE_GEBRUIKER_ROL, gebruiker.ROL);
    }
  }, []);

  useEffect(() => {
    setSession(token);
  }, [token, setSession]);

  const setTemplates = useCallback(async (id, rol) => {
    try {
      const gebruikerTemplate = await gebruikerTemplateApi.getTemplateById(id, "CATEGORIEEN");
      const rolTemplate = await rolTemplateApi.getTemplateByRole(rol, "CATEGORIEEN");
      localStorage.setItem(LS_GEBRUIKER_TEMPLATE, gebruikerTemplate);
      localStorage.setItem(LS_ROL_TEMPLATE, rolTemplate);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const login = useCallback(
    async ({ naam, wachtwoord }) => {
      try {
        setLoading(true);
        setError(null);
        const { token, gebruiker } = await gebruikerApi.login({
          naam,
          wachtwoord,
        });
        await setSession(token, gebruiker);
        await setTemplates(gebruiker.ID, gebruiker.ROL);
        return true;
      } catch (error) {
        console.error(error);
        setError("Login failed, try again");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setSession, setTemplates]
  );

  const logout = useCallback(() => {
    setSession(null, null);
  }, [setSession]);

  const hasRole = useCallback(
    role => {
      if (!gebruiker) return false;
      return gebruiker.ROL.includes(role);
    },
    [gebruiker]
  );

  const value = useMemo(
    () => ({
      token,
      gebruiker,
      error,
      ready,
      loading,
      login,
      logout,
      hasRole,
      setSession,
    }),
    [token, gebruiker, error, ready, loading, login, logout, hasRole, setSession]
  );

  return <GebruikerContext.Provider value={value}>{children}</GebruikerContext.Provider>;
};

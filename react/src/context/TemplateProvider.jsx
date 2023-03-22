import { createContext, useCallback, useMemo, useContext } from "react";
import config from "../config.json";
import * as categorieApi from "../api/dashboard/categorie";
import * as rolTemplateApi from "../api/dashboard/rolTemplate";

const LS_GEBRUIKER_TEMPLATE = config.template_gebruiker;
const LS_ROL_TEMPLATE = config.template_rol;

const TemplateContext = createContext();
const useTemplate = () => useContext(TemplateContext);

export const useGetCatergorieen = () => {
  const { getCategorieenTemplate } = useTemplate();
  return getCategorieenTemplate;
};

export const getCatsByRole = async (rol) => {
  let rolTemplate = [];
  if (rol === null || rol === undefined) {
    rolTemplate = localStorage.getItem(LS_ROL_TEMPLATE).split(",");
  } else {
    rolTemplate = await rolTemplateApi.getTemplateByRole(rol, "CATEGORIEEN");
    rolTemplate = rolTemplate.split(",");
  }
  const categorieenRol = [];
  for (const id of rolTemplate) {
    categorieenRol.push(await categorieApi.getById(Number(id)));
  }
  return categorieenRol;
};

export const TemplateProvider = ({ children }) => {
  const getCategorieenTemplate = useCallback(async () => {
    const rolTemplate = localStorage.getItem(LS_ROL_TEMPLATE).split(",");
    const gebruikerTemplate = localStorage
      .getItem(LS_GEBRUIKER_TEMPLATE)
      .split(",");

    if (rolTemplate.length > gebruikerTemplate.length) {
      const categorieenGebruiker = [];
      for (const id of gebruikerTemplate) {
        categorieenGebruiker.push(await categorieApi.getById(Number(id)));
      }
      return categorieenGebruiker;
    } else {
      const categorieenRol = [];
      for (const id of rolTemplate) {
        categorieenRol.push(await categorieApi.getById(Number(id)));
      }
      return categorieenRol;
    }
  }, []);

  const value = useMemo(
    () => ({ getCategorieenTemplate }),
    [getCategorieenTemplate]
  );
  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};

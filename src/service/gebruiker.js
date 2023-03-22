const { getChildLogger } = require("../core/logging");
const gebruikersRepository = require("../repository/gebruiker");
const { verifyPassword } = require("../core/password");
const { generateJWT, verifyJWT } = require("../core/jwt");
const Role = require("../core/rollen");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("gebruiker-service");
  this.logger.debug(message, meta);
};

const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw new Error("You need to be signed in");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new Error("Invalid authentication token");
  }

  const authToken = authHeader.substr(7);
  try {
    const { roles, ID } = await verifyJWT(authToken);
    return {
      ID,
      roles,
      authToken,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  return await gebruikersRepository.getAll();
};

const getGebruikerById = async (id) => {
  return await gebruikersRepository.getGebruikerById(id);
};

const getGebruikerByName = async (naam) => {
  return await gebruikersRepository.getGebruikerByName(naam);
};

const maakLoginData = async (gebruiker) => {
  const token = await generateJWT(gebruiker);
  return {
    gebruiker,
    token,
  };
};

const login = async ({ naam, wachtwoord }) => {
  const gebruiker = await gebruikersRepository.getGebruikerByName(naam);

  if (!gebruiker) {
    throw new Error("Naam en wachtwoord komen niet overeen");
  }

  if (await verifyPassword(wachtwoord, gebruiker.WACHTWOORD)) {
    debugLog(`${gebruiker.NAAM} is ingelogd`);
    return await maakLoginData(gebruiker);
  } else {
    throw new Error("Naam en wachtwoord komen niet overeen");
  }
};

const checkRole = (role, rollen) => {
  const hasPermission = rollen.includes(role);

  if (!hasPermission) {
    throw new Error("You are not allowed to view this part of the application");
  }
};

module.exports = {
  getAll,
  getGebruikerById,
  getGebruikerByName,
  login,
  checkAndParseSession,
  checkRole,
};

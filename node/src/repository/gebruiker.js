const { getChildLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");
const Role = require("../core/rollen");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("gebruiker-repo");
  this.logger.debug(message, meta);
};

const getAll = async () => {
  const gebruikers = await getKnex()(tables.gebruikers).select();
  return gebruikers;
};

const getGebruikerByName = async (naam) => {
  return await getKnex()(tables.gebruikers).where("naam", naam).first();
};

const getGebruikerById = async (id) => {
  return await getKnex()(tables.gebruikers).where("id", id).first();
};

module.exports = {
  getAll,
  getGebruikerByName,
  getGebruikerById,
};

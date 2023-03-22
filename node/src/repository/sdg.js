const { getChildLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("categorie-repo");
  this.logger.debug(message, meta);
};

const getAll = async () => {
  return getKnex()(tables.sdgs).select();
};

const getSdgById = async (id) => {
  debugLog("getting sdg by id:", { id });
  return getKnex()(tables.sdgs).where("id", id);
};

const getSdgByNaam = async (naam) => {
  debugLog("getting sdg by name:", { naam });
  return getKnex()(tables.sdgs).where("naam", naam);
};

const getSdgByCategorie = async (cat) => {
  return getKnex()(tables.sdgs).where("categorie", cat);
};

module.exports = {
  getAll,
  getSdgById,
  getSdgByNaam,
  getSdgByCategorie,
};

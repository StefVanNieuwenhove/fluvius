const { getChildLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("categorie-repo");
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog("getting all cat.");
  return getKnex()(tables.categorieen).select();
};

const getCatById = async id => {
  debugLog("getting cat by id:", { id });
  return getKnex()(tables.categorieen).where("id", id).first();
};

const getCatByNaam = async naam => {
  debugLog("getting cat by naam:", { naam });
  return getKnex()(tables.categorieen).where("naam", naam).first();
};

module.exports = {
  getAll,
  getCatById,
  getCatByNaam,
};

const config = require("config");
const { getChildLogger } = require("../core/logging");
const sdgRepository = require("../repository/sdg");

const DEFAULT_PAGINATION_LIMIT = config.get("pagination.limit");
const DEFAULT_PAGINATION_OFFSET = config.get("pagination.offset");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("sdg-service");
  this.logger.debug(message, meta);
};

const getAll = async () => {
  return await sdgRepository.getAll();
};

const getSdgById = async (id) => {
  return await sdgRepository.getSdgById(id);
};

const getSdgByNaam = async (naam) => {
  return await sdgRepository.getSdgByNaam(naam);
};

const getSdgByCategorie = async (cat) => {
  return await sdgRepository.getSdgByCategorie(cat);
};

module.exports = {
  getAll,
  getSdgById,
  getSdgByNaam,
  getSdgByCategorie,
};

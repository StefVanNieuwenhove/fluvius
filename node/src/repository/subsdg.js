const { getChildLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("subsdg-repository");
  this.logger.debug(message, meta);
};

const getAll = async () => {
  return getKnex()(tables.subsdgs).select();
};

const getSubById = async (id) => {
  return getKnex()(tables.subsdgs).where("id", id);
};

const getSubBySdg = async (sdg) => {
  return getKnex()(tables.subsdgs).where("sdg", sdg);
};

module.exports = {
  getAll,
  getSubById,
  getSubBySdg,
};

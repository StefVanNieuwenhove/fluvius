const { getChildLogger } = require("../core/logging");
const { tables, getKnex } = require("../data/index");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("datasource-repository");
  this.logger.debug(message, meta);
};

const getAll = async () => {
    return getKnex()(tables.datasources).select();
};

const getDatasourceById = async (id) => {
    return getKnex()(tables.datasources).where("id", id);
};

module.exports = {
    getAll,
    getDatasourceById,
}
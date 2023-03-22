const { tables, getKnex } = require("../data/index");
const { getChildLogger } = require("../core/logging");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("rapportds-repo");
  this.logger.debug(message, meta);
};

const getAll = () => {
  return getKnex()(tables.rapportds).select();
};

const createRapport = async rapport => {
  try {
    await getKnex()(tables.rapportds).insert(rapport);
  } catch (error) {
    const logger = getChildLogger("rapportds-repo");
    logger.error("Error in create", {
      error,
    });
    throw error;
  }
};

const deleteRapport = async id => {
  try {
    await getKnex()(tables.rapportds).delete().where("ID", id);
  } catch (error) {
    const logger = getChildLogger("rapportds-repo");
    logger.error("Error in create", {
      error,
    });
    throw error;
  }
};

module.exports = {
  getAll,
  createRapport,
  deleteRapport,
};

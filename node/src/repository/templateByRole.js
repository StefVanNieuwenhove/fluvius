const { tables, getKnex } = require("../data/index");
const { getChildLogger } = require("../core/logging");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("templatebyrole-repo");
  this.logger.debug(message, meta);
};

const getByRol = async (rol) => {
  const templatebyrole = await getKnex()(tables.templatebyrole)
    .where("ROL", rol)
    .first();

  return templatebyrole;
};

const updateCatByRol = async (rol, categorieen) => {
  try {
    await getKnex()(tables.templatebyrole)
      .update(categorieen)
      .where("ROL", rol);
    return await getByRol(rol);
  } catch (error) {
    debugLog("Error in updateByRol", {
      error,
    });
    throw error;
  }
};

module.exports = {
  getByRol,
  updateCatByRol,
};

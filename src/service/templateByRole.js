const { getChildLogger } = require("../core/logging");
const templatebyroleRepository = require("../repository/templateByRole");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("templatebyrole-service");
  this.logger.debug(message, meta);
};

const getByRol = async (rol) => {
  debugLog(`Fetching templatebyrole with rol: ${rol}`);
  const data = await templatebyroleRepository.getByRol(rol);
  return {
    data,
  };
};

const updateCatByRol = async (rol, categorieen) => {
  debugLog(`Updating templateByRole with rol ${rol}`);
  return await templatebyroleRepository.updateCatByRol(rol, categorieen);
};

module.exports = {
  getByRol,
  updateCatByRol,
};

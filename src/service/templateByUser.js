const config = require("config");
const {
  getChildLogger
} = require("../core/logging");
const templatebyuserRepository = require("../repository/templateByUser");

const debugLog = (message, meta = {}) => {
  if (!this.logger)
    this.logger = getChildLogger("templatebyuser-service");
  this.logger.debug(message, meta);
};

const getById = async (gebruikerid) => {
  debugLog(`Fetching all templatesbyuser with id: ${gebruikerid}`);
  const data = await templatebyuserRepository.getById(gebruikerid);
  return {
    data,
  };
};

const updateCatById = async (gebruikerid, categorieen) => {
  debugLog(
    `Updating templateByUser with id ${gebruikerid}`,
  );
  return await templatebyuserRepository.updateCatById(
    gebruikerid,
    categorieen
  );
};


module.exports = {
  getById,
  updateCatById,
};
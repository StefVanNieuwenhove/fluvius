const {
  getChildLogger
} = require("../core/logging");
const mvoDoelstellingComponentRepository = require("../repository/mvoDoelstellingComponent");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("mvoDoelstellingComponent-service");
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog("Fetching all mvodoelstellingen");
  const data = await mvoDoelstellingComponentRepository.getAll();
  return {
    data
  };
};

const getAllById = async (id) => {
  debugLog("Fetching mvodoelstellingen by id");
  const data = await mvoDoelstellingComponentRepository.getAllById(id);
  return {
    data
  };
};

const getAllSubs = async () => {
  debugLog("Fetching all submvodoelstellingen");
  const data = await mvoDoelstellingComponentRepository.getAllSubs();
  return {
    data
  };
};

const getAllBySubsdg = async (subsdg) => {
  debugLog("Fetching all mvodoelstellingen");
  const data = await mvoDoelstellingComponentRepository.getAllBySubsdg(subsdg);
  return {
    data
  };
};

const getAllSubsbyMvo = async (mvo) => {
  debugLog("Fetching all submvodoelstellingen");
  const data = await mvoDoelstellingComponentRepository.getAllSubsbyMvo(mvo);
  return {
    data
  };
};

module.exports = {
  getAll,
  getAllById,
  getAllSubs,
  getAllBySubsdg,
  getAllSubsbyMvo,
};
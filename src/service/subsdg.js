const { getChildLogger} = require("../core/logging");
const subRepository = require("../repository/subsdg");

const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getChildLogger("subsdg-service");
    this.logger.debug(message, meta);
  };
  
const getAll = async () => {
    return await subRepository.getAll();
};

const getSubById = async (id) => {
    return await subRepository.getSubById(id);
};

const getSubByCategorie = async (cat) => {
    return await subRepository.getSubByCategorie(cat);
};

const getSubBySdg = async (sdg) => {
    return await subRepository.getSubBySdg(sdg);
};

module.exports = {
    getAll,
    getSubById,
    getSubByCategorie,
    getSubBySdg,
}
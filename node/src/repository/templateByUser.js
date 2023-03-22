const { tables, getKnex } = require("../data/index");
const { getChildLogger } = require("../core/logging");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("templatebyuser-repo");
  this.logger.debug(message, meta);
};

const updateCatById = async (gebruikerid, categorieen) => {
  //id = gebruikerId
  try {
    await getKnex()(tables.templatebyuser)
      .update(categorieen)
      .where("GEBRUIKERID", gebruikerid);
    return await getById(gebruikerid);
  } catch (error) {
    debugLog("Error in updateById", {
      error,
    });
    throw error;
  }
};

const getById = async (gebruikerid) => {
  //id = gebruikerId
  const templatebyuser = await getKnex()(tables.templatebyuser)
    .where("GEBRUIKERID", gebruikerid)
    .first();
  return templatebyuser;
};

module.exports = {
  updateCatById,
  getById,
};

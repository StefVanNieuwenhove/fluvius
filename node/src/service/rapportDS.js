const config = require("config");
const { getChildLogger } = require("../core/logging");
const rapportDSRepository = require("../repository/rapportDS");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("rapportds-service");
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog("Fetching all rapports");
  const data = await rapportDSRepository.getAll();
  return data;
};

const createRapport = async ({ datasource, msg }) => {
  //zoeken naar eerstvolgende id dat nog niet in gebruik is
  const allReports = await getAll();

  const laatste = allReports.at(-1);
  let id;
  if (laatste) {
    id = laatste.ID + 1;
  } else id = 1;

  const newRapport = {
    ID: id,
    DATASOURCE: datasource,
    MSG: msg,
  };
  console.log(newRapport);
  debugLog("Creating new rapport", newRapport);
  return await rapportDSRepository.createRapport(newRapport);
};

const deleteRapport = async id => {
  return await rapportDSRepository.deleteRapport(id);
};

module.exports = {
  getAll,
  createRapport,
  deleteRapport,
};

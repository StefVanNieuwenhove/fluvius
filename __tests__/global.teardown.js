const { shutdownData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  await getKnex()(tables.gebruikers).delete();
  await getKnex()(tables.categorieen).delete();
  await getKnex()(tables.mvodoelstellingcomponent).delete();
  await getKnex()(tables.datasources).delete();
  await getKnex()(tables.sdgs).delete();
  await getKnex()(tables.subsdgs).delete();

  await shutdownData();
};

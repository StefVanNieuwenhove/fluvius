const mockdata = require("../mock-data");
const {
  tables
} = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.rapportds).delete();
    await knex(tables.rapportds).insert(mockdata.RAPPORTDS);
  },
};
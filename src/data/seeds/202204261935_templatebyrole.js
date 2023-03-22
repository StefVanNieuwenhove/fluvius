const mockdata = require("../mock-data");
const {
  tables
} = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.templatebyrole).delete();
    await knex(tables.templatebyrole).insert(mockdata.TEMPLATEBYROLE);
  },
};
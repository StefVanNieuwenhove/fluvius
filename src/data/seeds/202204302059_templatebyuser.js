const mockdata = require("../mock-data");
const {
  tables
} = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.templatebyuser).delete();
    await knex(tables.templatebyuser).insert(mockdata.TEMPLATEBYUSER);
  },
};
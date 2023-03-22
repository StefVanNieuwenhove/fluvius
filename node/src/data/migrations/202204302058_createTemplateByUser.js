const {
  tables
} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(
      tables.templatebyuser,
      (table) => {
        table.integer("GEBRUIKERID");
        table.string("CATEGORIEEN", 250);
        table.string("SDGS", 250);
      }
    );
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.templatebyuser);
  },
};
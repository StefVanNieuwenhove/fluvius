const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.templatebyrole, (table) => {
      table.string("ROL");
      table.string("CATEGORIEEN", 250);
      table.string("SDGS", 250);
    });
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.templatebyrole);
  },
};

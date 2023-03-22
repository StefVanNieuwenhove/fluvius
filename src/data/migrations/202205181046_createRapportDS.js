const {
  tables
} = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(
      tables.rapportds,
      (table) => {
        table.increments("ID").primary().notNullable();
        table.string("DATASOURCE");
        table.string("MSG", 250);
      }
    );
  },
  down: async (knex) => {
    return knex.schema.dropTableIfExists(tables.rapportds);
  },
};
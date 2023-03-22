const {
    tables
} = require("..");

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.datasources, table => {
            table.increments("ID").primary().notNullable();
            table.jsonb("DATA");
            table.string("NAAM", 250);
        });
    },
    down: async (knex) => {
        return knex.schema.dropTableIfExists(tables.datasources);
    },
};
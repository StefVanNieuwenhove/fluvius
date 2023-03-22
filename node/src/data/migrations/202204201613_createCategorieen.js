const {
    tables
} = require("..");

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.categorieen, table => {
            table.increments("ID").primary().notNullable();
            table.string("NAAM", 250);
            table.string("URLICOON", 250);
        });
    },
    down: async (knex) => {
        return knex.schema.dropTableIfExists(tables.categorieen);
    },
};
const {
    tables
} = require("..");

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.sdgs, table => {
            table.increments("ID").primary().notNullable();
            table.string("NAAM", 250);
            table.integer("NUMMERING", 250);
            table.string("URLICOON", 250);
            table.integer("CATEGORIE");
        });
    },
    down: async (knex) => {
        return knex.schema.dropTableIfExists(tables.sdgs);
    },
};
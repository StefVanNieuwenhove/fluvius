const {
    tables
} = require("..");

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.subsdgs, table => {
            table.increments("ID").primary().notNullable();
            table.string("BESCHRIJVING", 250);
            table.string("NUMMERING", 250);
            table.string("URLICOON", 250);
            table.integer("CATEGORIE");
            table.integer("SDG");
        });
    },
    down: async (knex) => {
        return knex.schema.dropTableIfExists(tables.subsdgs);
    },
};
const {
    tables
} = require("..");

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.gebruikers, table => {
            table.increments("ID").primary().notNullable();
            table.string("NAAM", 250);
            table.jsonb("ROL");
            table.string("WACHTWOORD", 250);
        });
    },
    down: async (knex) => {
        return knex.schema.dropTableIfExists(tables.gebruikers);
    },
};
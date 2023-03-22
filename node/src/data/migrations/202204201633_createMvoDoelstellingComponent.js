const {
    tables
} = require("..");

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.mvodoelstellingcomponent, table => {
            table.increments("ID").primary().notNullable();
            table.string("DTYPE", 250);
            table.string("ICOON", 250);
            table.string("NAAM", 250);
            table.json("DATASOURCES");
            table.integer("DOELWAARDE");
            table.integer("subsMVOdoelstelling");
            table.integer("SUBSDG");
        });
    },
    down: async (knex) => {
        return knex.schema.dropTableIfExists(tables.mvodoelstellingcomponent);
    },
};
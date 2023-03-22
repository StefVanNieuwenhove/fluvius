const mockdata = require("../mock-data");
const {
    tables
} = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.gebruikers).delete();
        await knex(tables.gebruikers).insert(mockdata.GEBRUIKERS);
    },
};
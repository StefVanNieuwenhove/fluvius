const mockdata = require("../mock-data");
const {
    tables
} = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.datasources).delete();
        await knex(tables.datasources).insert(mockdata.DATASOURCES);
    },
};
const mockdata = require("../mock-data");
const {
    tables
} = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.sdgs).delete();
        await knex(tables.sdgs).insert(mockdata.SDGS);
    },
};
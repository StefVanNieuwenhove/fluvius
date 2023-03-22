const mockdata = require("../mock-data");
const {
    tables
} = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.subsdgs).delete();
        await knex(tables.subsdgs).insert(mockdata.SUBSDGS);
    },
};
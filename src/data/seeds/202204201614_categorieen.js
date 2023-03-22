const mockdata = require("../mock-data");
const {
    tables
} = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.categorieen).delete();
        await knex(tables.categorieen).insert(mockdata.CATEGORIEEN);
    },
};
const mockdata = require("../mock-data");
const {
    tables
} = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.mvodoelstellingcomponent).delete();
        await knex(tables.mvodoelstellingcomponent).insert(mockdata.MVODOELSTELLINGCOMPONENT);
    },
};
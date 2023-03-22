const datasourceRepository = require("../repository/datasource");

const getAll = async () => {
    return await datasourceRepository.getAll();
};

const getDatasourceById = async (id) => {
    return await datasourceRepository.getDatasourceById(id);
};

module.exports = {
    getAll,
    getDatasourceById,
}
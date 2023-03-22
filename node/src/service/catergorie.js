const categorieRepository = require("../repository/categorie");

const getAll = async () => {
  return await categorieRepository.getAll();
};

const getCatById = async (id) => {
  return await categorieRepository.getCatById(id);
};

const getCatByNaam = async (naam) => {
  return await categorieRepository.getCatByNaam(naam);
};

module.exports = {
  getAll,
  getCatById,
  getCatByNaam,
};

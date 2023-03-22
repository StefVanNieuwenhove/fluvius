const {
  tables,
  getKnex
} = require("../data/index");

const getAll = () => {
  return getKnex()(tables.mvodoelstellingcomponent)
    .select(["ID", "NAAM", "ICOON"]).where("DTYPE", "MvoDoelstelling");
};

const getAllById = (id) => {
  return getKnex()(tables.mvodoelstellingcomponent)
    .select(["ID", "NAAM", "ICOON"]).where("DTYPE", "MvoDoelstelling").where("ID", id);
};

const getAllSubs = () => {
  return getKnex()(tables.mvodoelstellingcomponent)
    .select(["ID", "NAAM", "DOELWAARDE", "ICOON"]).where("DTYPE", "SubMvoDoelstelling");
};

const getAllBySubsdg = (subsdg) => {
  return getKnex()(tables.mvodoelstellingcomponent)
    .select(["ID", "NAAM", "ICOON"]).where("DTYPE", "MvoDoelstelling").where("SUBSDG", subsdg);
};

const getAllSubsbyMvo = (mvo) => {
  return getKnex()(tables.mvodoelstellingcomponent)
    .select(["ID", "NAAM", "DOELWAARDE", "ICOON"]).where("DTYPE", "SubMvoDoelstelling").where("subsMvoDoelstelling", mvo);
};

module.exports = {
  getAll,
  getAllById,
  getAllSubs,
  getAllBySubsdg,
  getAllSubsbyMvo,
};
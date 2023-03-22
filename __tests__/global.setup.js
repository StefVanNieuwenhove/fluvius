const { initializeData, getKnex, tables } = require("../src/data");
const rollen = require("../src/core/rollen");
const { initializeLogger } = require("../src/core/logging");
const config = require("config");

const testGebruikers = [
  {
    ID: 1,
    NAAM: "mvocoordinator",
    ROL: JSON.stringify(rollen.MVOCOORDINATOR),
    WACHTWOORD: "$argon2id$v=19$m=131072,t=6,p=1$StG4ryAoO+DRdVKJEbXXBg$Dmc+kC57hs1RB/Gk3rRDxBJqWSKo0OAYPrMT7Byo76c",
  },
  {
    ID: 2,
    NAAM: "gebruiker",
    ROL: JSON.stringify(rollen.GEBRUIKER),
    WACHTWOORD: "$argon2id$v=19$m=131072,t=6,p=1$StG4ryAoO+DRdVKJEbXXBg$Dmc+kC57hs1RB/Gk3rRDxBJqWSKo0OAYPrMT7Byo76c",
  },
];

module.exports = async () => {
  initializeLogger({
    level: config.get("log.level"),
    disabled: config.get("log.disabled"),
  });
  await initializeData();
  const knex = getKnex();
  await knex(tables.gebruikers).insert(testGebruikers);
};

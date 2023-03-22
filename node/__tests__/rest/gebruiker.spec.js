const {
  withServer,
  loginMvoCoordinator
} = require("../supertest.setup");
const {
  tables
} = require("../../src/data/index");
const rollen = require("../../src/core/rollen");

const testData = {
  gebruikers: [{
      ID: 1,
      NAAM: "mvocoordinator",
      ROL: JSON.stringify(rollen.MVOCOORDINATOR),
      WACHTWOORD: "$argon2id$v=19$m=131072,t=6,p=1$StG4ryAoO+DRdVKJEbXXBg$Dmc+kC57hs1RB/Gk3rRDxBJqWSKo0OAYPrMT7Byo76c",
    },
    {
      ID: 2,
      NAAM: "manager",
      ROL: JSON.stringify(rollen.MANAGER),
      WACHTWOORD: "$argon2id$v=19$m=131072,t=6,p=1$StG4ryAoO+DRdVKJEbXXBg$Dmc+kC57hs1RB/Gk3rRDxBJqWSKo0OAYPrMT7Byo76c",
    },
    {
      ID: 3,
      NAAM: "directie",
      ROL: JSON.stringify(rollen.DIRECTIE),
      WACHTWOORD: "$argon2id$v=19$m=131072,t=6,p=1$StG4ryAoO+DRdVKJEbXXBg$Dmc+kC57hs1RB/Gk3rRDxBJqWSKo0OAYPrMT7Byo76c",
    },
    {
      ID: 4,
      NAAM: "gebruiker",
      ROL: JSON.stringify(rollen.GEBRUIKER),
      WACHTWOORD: "$argon2id$v=19$m=131072,t=6,p=1$StG4ryAoO+DRdVKJEbXXBg$Dmc+kC57hs1RB/Gk3rRDxBJqWSKo0OAYPrMT7Byo76c",
    },
  ],
};

describe("Gebruiker", () => {
  let knex;
  let loginHeader;
  let req;

  withServer(({
    knex: k,
    supertest: s
  }) => {
    knex = k;
    req = s;
  });

  beforeAll(async () => {
    loginHeader = await loginMvoCoordinator(req);
  });

  const url = "/api/gebruiker";

  //GET ALL TEST
  describe(`GET ${url}`, () => {
    beforeAll(async () => {
      await knex(tables.gebruikers).insert(testData.gebruikers);
    });

    afterAll(async () => {
      await knex(tables.gebruikers).delete();
    });

    test("it should 200 and return all users", async () => {
      const response = await req.get(url);

      expect(response.status).toBe(200);

      //we verwachten 4 gebruikers
      expect(response.body.length).toBeGreaterThanOrEqual(4);
    });
  });

  //GET BY ID TEST
  describe(`GET ${url}/id/:id`, () => {
    beforeAll(async () => {
      await knex(tables.gebruikers).insert(testData.gebruikers);
    });

    afterAll(async () => {
      await knex(tables.gebruikers).delete();
    });

    // we verwachten de toegevoegde gebruiker terug te krijgen door op ID te zoeken
    test("it should 200 and return the requested user by id", async () => {
      const response = await req.get(`${url}/id/${testData.gebruikers[0].ID}`).set("Authorization", loginHeader);
      expect(response.status).toBe(200);
    });
  });

  //GET BY NAME TEST
  describe(`GET ${url}/:naam`, () => {
    beforeAll(async () => {
      await knex(tables.gebruikers).insert(testData.gebruikers);
    });

    afterAll(async () => {
      await knex(tables.gebruikers).delete();
    });

    test("it should 200 and return the requested user by name", async () => {
      //We zoeken naar de gebruiker met naam "mvocoordinator"
      const naam = "mvocoordinator";
      const response = await req.get(`${url}/${naam}`).set("Authorization", loginHeader);
      expect(response.status).toBe(200);
    });
  });
});
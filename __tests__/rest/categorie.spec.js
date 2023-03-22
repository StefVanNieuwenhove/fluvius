const {
  withServer,
  loginMvoCoordinator
} = require("../supertest.setup");

const {
  tables
} = require("../../src/data/index");

const testData = {
  categorieen: [{
      ID: 1,
      NAAM: "Environment",
      URLICOON: "https://cdn-icons-png.flaticon.com/512/2427/2427589.png",
    },
    {
      ID: 2,
      NAAM: "Economic",
      URLICOON: "https://cdn-icons-png.flaticon.com/512/3310/3310624.png",
    },
    {
      ID: 3,
      NAAM: "Social",
      URLICOON: "https://cdn-icons-png.flaticon.com/512/921/921356.png",
    },
  ],
};

describe("Categorie", () => {
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

  const url = "/api/categorie";

  //GET ALL TEST
  describe(`GET ${url}`, () => {
    beforeAll(async () => {
      await knex(tables.categorieen).insert(testData.categorieen);
    });

    afterAll(async () => {
      await knex(tables.categorieen).delete();
    });

    test("it should 200 and return all categories", async () => {
      const response = await req.get(url).set("Authorization", loginHeader);

      expect(response.status).toBe(200);

      //we verwachten 3 categorieen
      expect(response.body.length).toBeGreaterThanOrEqual(3);
    });
  });

  //GET BY ID TEST
  describe(`GET ${url}/id/:id`, () => {
    // 1 categorie toevoegen
    beforeAll(async () => {
      await knex(tables.categorieen).insert(testData.categorieen[0]);
    });

    afterAll(async () => {
      await knex(tables.categorieen).where("id", testData.categorieen[0].ID).delete();
    });

    // we verwachten de toegevoegde categorie terug te krijgen door op ID te zoeken
    test("it should 200 and return the requested category by id", async () => {
      const response = await req.get(`${url}/id/${testData.categorieen[0].ID}`).set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(testData.categorieen[0]);
    });
  });

  //GET BY NAME TEST
  describe(`GET ${url}/:naam`, () => {
    beforeAll(async () => {
      await knex(tables.categorieen).insert(testData.categorieen);
    });

    afterAll(async () => {
      await knex(tables.categorieen).delete();
    });

    test("it should 200 and return the requested category by name", async () => {
      //We zoeken naar de categorie met naam "Environment"
      const naam = "Environment";
      const response = await req.get(`${url}/${naam}`).set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      //categorie met naam "Environment" is de eerste in testData
      expect(response.body).toEqual(testData.categorieen[0]);
    });
  });
});
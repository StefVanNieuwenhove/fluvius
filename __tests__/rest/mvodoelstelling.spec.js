const {
  withServer,
  loginMvoCoordinator
} = require("../supertest.setup");
const datasources = require("../../src/data/datasources");
const {
  tables
} = require("../../src/data/index");

const testData = {
  mvodoelstellingen: [{
      ID: 1,
      DTYPE: "SubMvoDoelstelling",
      ICOON: "https://cdn-icons-png.flaticon.com/512/733/733641.png",
      NAAM: "TestSubMvo3",
      DATASOURCES: JSON.stringify(datasources.DS1),
      DOELWAARDE: 0,
      subsMvoDoelstelling: 9,
      SUBSDG: null,
    },
    {
      ID: 6,
      DTYPE: "MvoDoelstelling",
      ICOON: "https://cdn-icons-png.flaticon.com/512/3143/3143442.png",
      NAAM: "TestMvo1",
      DATASOURCES: null,
      DOELWAARDE: 0,
      subsMvoDoelstelling: null,
      SUBSDG: 9,
    },
  ],
};

describe("MvoDoelstelling", () => {
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

  const url = "/api/mvodoelstelling";

  //GET ALL TEST
  describe(`GET ${url}`, () => {
    beforeAll(async () => {
      await knex(tables.mvodoelstellingcomponent).insert(testData.mvodoelstellingen);
    });

    afterAll(async () => {
      await knex(tables.mvodoelstellingcomponent).delete();
    });

    test("it should 200 and return all doelstellingen", async () => {
      const response = await req.get(url).set("Authorization", loginHeader);

      const expected = {
        ID: 6,
        NAAM: "TestMvo1",
        ICOON: "https://cdn-icons-png.flaticon.com/512/3143/3143442.png",
      };

      expect(response.status).toBe(200);

      //we verwachten 1 mvodoelstelling
      expect(response.body.data[0]).toEqual(expected);
    });
  });

  //GET ALL SUB MVO'S TEST
  describe(`GET ${url}/sub`, () => {
    // mvodoelstelling toevoegen
    beforeAll(async () => {
      await knex(tables.mvodoelstellingcomponent).insert(testData.mvodoelstellingen);
    });

    afterAll(async () => {
      await knex(tables.mvodoelstellingcomponent).delete();
    });

    // we verwachten de toegevoegde mvodoelstelling terug te krijgen door op ID te zoeken
    test("it should 200 and return all sub doelstellingen", async () => {
      const response = await req.get(`${url}/sub`).set("Authorization", loginHeader);
      expect(response.status).toBe(200);
    });
  });
});
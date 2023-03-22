const { withServer, loginMvoCoordinator } = require("../supertest.setup");
const { tables } = require("../../src/data/index");

const testData = {
  sdgs: [
    {
      ID: 1,
      NAAM: "Peace, justice and string institutions",
      NUMMERING: 16,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-16-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 2,
      NAAM: "Quality education",
      NUMMERING: 4,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-04-1024x1024.png",
      CATEGORIE: 1,
    },
    {
      ID: 3,
      NAAM: "Industry, innovation and infrastructure",
      NUMMERING: 9,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-09-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 4,
      NAAM: "Life on land",
      NUMMERING: 15,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-15-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 5,
      NAAM: "Reduce inequalities",
      NUMMERING: 10,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-10-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 6,
      NAAM: "Zero Hunger",
      NUMMERING: 2,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-02-1024x1024.png",
      CATEGORIE: 2,
    },
    {
      ID: 7,
      NAAM: "Decent work and economic growth",
      NUMMERING: 8,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-08-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 8,
      NAAM: "Partnerships for the goals",
      NUMMERING: 17,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-17-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 9,
      NAAM: "No poverty",
      NUMMERING: 1,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-01-1024x1024.png",
      CATEGORIE: 2,
    },
    {
      ID: 10,
      NAAM: "Climate action",
      NUMMERING: 13,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-13-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 11,
      NAAM: "Clean water and sanitation",
      NUMMERING: 6,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-06-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 12,
      NAAM: "Gender equality",
      NUMMERING: 5,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-05-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 13,
      NAAM: "Affordable and clean energy",
      NUMMERING: 7,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-07-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 14,
      NAAM: "Good health and well-being",
      NUMMERING: 3,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-03-1024x1024.png",
      CATEGORIE: 1,
    },
    {
      ID: 15,
      NAAM: "Sustainable cities and communities",
      NUMMERING: 11,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-11-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 16,
      NAAM: "Life below water",
      NUMMERING: 14,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-14-1024x1024.png",
      CATEGORIE: null,
    },
    {
      ID: 17,
      NAAM: "Responsible consumption and production",
      NUMMERING: 12,
      URLICOON: "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-12-1024x1024.png",
      CATEGORIE: null,
    },
  ],
};

describe("Sdg", () => {
  let knex;
  let loginHeader;
  let req;

  withServer(({ knex: k, supertest: s }) => {
    knex = k;
    req = s;
  });

  beforeAll(async () => {
    loginHeader = await loginMvoCoordinator(req);
  });

  const url = "/api/sdg";

  //GET ALL TEST
  describe(`GET ${url}`, () => {
    beforeAll(async () => {
      await knex(tables.sdgs).insert(testData.sdgs);
    });

    afterAll(async () => {
      await knex(tables.sdgs).delete();
    });

    test("it should 200 and return all sdgs", async () => {
      const response = await req.get(url).set("Authorization", loginHeader);

      expect(response.status).toBe(200);

      //we verwachten 17 sdgs
      expect(response.body.length).toBeGreaterThanOrEqual(17);
    });
  });

  //GET BY ID TEST
  describe(`GET ${url}/id/:id`, () => {
    // 1 sdg toevoegen
    beforeAll(async () => {
      await knex(tables.sdgs).insert(testData.sdgs[0]);
    });

    afterAll(async () => {
      await knex(tables.sdgs).where("ID", testData.sdgs[0].ID).delete();
    });

    // we verwachten de toegevoegde sdg terug te krijgen door op ID te zoeken
    test("it should 200 and return the requested sdg by id", async () => {
      const response = await req.get(`${url}/id/${testData.sdgs[0].ID}`).set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      expect(response.body[0]).toEqual(testData.sdgs[0]);
    });
  });

  //GET BY NAME TEST
  describe(`GET ${url}/:naam`, () => {
    beforeAll(async () => {
      await knex(tables.sdgs).insert(testData.sdgs);
    });

    afterAll(async () => {
      await knex(tables.sdgs).delete();
    });

    test("it should 200 and return the requested sdg by name", async () => {
      //We zoeken naar de sdg met naam "Peace, justice and string institutions"
      const naam = "Peace, justice and string institutions";
      const response = await req.get(`${url}/${naam}`).set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      //sdg met naam "Peace, justice and string institutions" is de tweede in testData
      expect(response.body[0]).toEqual(testData.sdgs[0]);
    });
  });
});

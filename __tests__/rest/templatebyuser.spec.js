const {
  withServer,
  loginMvoCoordinator
} = require("../supertest.setup");
const datasources = require("../../src/data/datasources");
const {
  tables
} = require("../../src/data/index");

const testData = {
  template: [{
      GEBRUIKERID: 1,
      CATEGORIEEN: "1,2,3",
      SDGS: "",
    },
    {
      GEBRUIKERID: 2,
      CATEGORIEEN: "1,2",
      SDGS: "",
    },
    {
      GEBRUIKERID: 3,
      CATEGORIEEN: "1",
      SDGS: "",
    },
    {
      GEBRUIKERID: 4,
      CATEGORIEEN: "1",
      SDGS: "",
    },
  ],
};

describe("TemplateByUser", () => {
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

  const url = "/api/templatebyuser";

  //GET BY USER TEST
  describe(`GET ${url}`, () => {
    beforeAll(async () => {
      await knex(tables.templatebyuser).insert(testData.template);
    });

    afterAll(async () => {
      await knex(tables.templatebyuser).delete();
    });

    test("it should 200 and return 1 template", async () => {
      const response = await req.get(`${url}/1`).set("Authorization", loginHeader);

      expect(response.status).toBe(200);
    });
  });

  describe(`PUT ${url}`, () => {
    // mvodoelstelling toevoegen
    beforeAll(async () => {
      await knex(tables.templatebyuser).insert(testData.template);
    });

    afterAll(async () => {
      await knex(tables.templatebyuser).delete();
    });

    test("it should 200 and return the updated tamplate", async () => {
      const response = await req.put(`${url}/1`)
        .set("Authorization", loginHeader)
        .send({
          GEBRUIKERID: 1,
          CATEGORIEEN: "1,2",
          SDGS: "",
        });
      expect(response.status).toBe(200);
      expect(response.body.id).toBeTruthy();
      expect(response.body.GEBRUIKERID).toBe(1);
      expect(response.body.CATEGORIEEN).toBe("1,2");
      expect(response.body.SDGS).toBe("");
    });
  });
});
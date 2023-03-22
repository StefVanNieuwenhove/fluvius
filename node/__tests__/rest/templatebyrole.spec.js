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
      ROL: "mvocoordinator",
      CATEGORIEEN: "1,2,3",
      SDGS: "",
    },
    {
      ROL: "manager",
      CATEGORIEEN: "1,2,3",
      SDGS: "",
    },
    {
      ROL: "directie",
      CATEGORIEEN: "1,2",
      SDGS: "",
    },
    {
      ROL: "gebruiker",
      CATEGORIEEN: "1",
      SDGS: "",
    },
  ],
};

describe("TemplateByRole", () => {
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

  const url = "/api/templatebyrole";

  //GET BY ROLE TEST
  describe(`GET ${url}`, () => {
    beforeAll(async () => {
      await knex(tables.templatebyrole).insert(testData.template);
    });

    afterAll(async () => {
      await knex(tables.templatebyrole).delete();
    });

    test("it should 200 and return 1 template", async () => {
      const response = await req.get(`${url}/gebruiker`).set("Authorization", loginHeader);

      expect(response.status).toBe(200);
    });
  });

  describe(`PUT ${url}`, () => {

    beforeAll(async () => {
      await knex(tables.templatebyrole).insert(testData.template);
    });

    afterAll(async () => {
      await knex(tables.templatebyrole).delete();
    });

    test("it should 200 and return the updated tamplate", async () => {
      const response = await req.put(`${url}/genruiker`)
        .set("Authorization", loginHeader)
        .send({
          ROL: "gebruiker",
          CATEGORIEEN: "1,2",
          SDGS: "",
        }, );
      expect(response.status).toBe(200);
      expect(response.body.id).toBeTruthy();
      expect(response.body.ROL).toBe("gebruiker");
      expect(response.body.CATEGORIEEN).toBe("1,2");
      expect(response.body.SDGS).toBe("");
    });
  });
});
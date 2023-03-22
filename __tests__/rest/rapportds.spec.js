const {
  withServer,
  loginMvoCoordinator
} = require("../supertest.setup");
const datasources = require("../../src/data/datasources");
const {
  tables
} = require("../../src/data/index");

const testData = {
  rapports: [{
    ID: 1,
    DATASOURCE: "Datasource0",
    MSG: "Dit is een rapport",
  }, {
    ID: 2,
    DATASOURCE: "Datasource1",
    MSG: "Dit is een rapport+",
  }, ]
}

describe("RapportDS", () => {
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

  const url = "/api/rapportds";

  //GET ALL TEST
  describe(`GET ${url}`, () => {
    beforeAll(async () => {
      await knex(tables.rapportds).insert(testData.rapports);
    });

    afterAll(async () => {
      await knex(tables.rapportds).delete();
    });

    test("it should 200 and return all rapports", async () => {
      const response = await req.get(url).set("Authorization", loginHeader);

      expect(response.status).toBe(200);
    });
  });

  describe(`DELETE ${url}/id`, () => {
    beforeAll(async () => {
      await knex(tables.rapportds).insert(testData.rapports);
    });

    afterAll(async () => {
      await knex(tables.rapportds).delete();
    });

    test("it should 204 and return nothing", async () => {
      const response = await req.delete(`${url}/1`).set("Authorization", loginHeader);
      expect(response.status).toBe(204);
    });
  });

  describe(`POST ${url}`, () => {

    beforeAll(async () => {
      await knex(tables.rapportds).insert(testData.rapports);
    });

    afterAll(async () => {
      await knex(tables.rapportds).delete();
    });

    test("it should 201 and return the created datasource", async () => {
      const response = await req.post(url)
        .send({
          ID: 1,
          DATASOURCE: "datasource",
          MSG: "msg",
        });
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.DATASOURCE).toBe("datasource");
      expect(response.body.MSG).toBe("msg");
    });
  });
});
const supertest = require("supertest");

const createServer = require("../src/createServer");
const {
  getKnex
} = require("../src/data");

const loginMvoCoordinator = async supertest => {
  const res = await supertest.post("/api/gebruiker/login").send({
    naam: "mvocoordinator",
    wachtwoord: "Test123",
  });

  if (res.statusCode !== 200) {
    throw new Error(res.body.message || "Unknown error occured");
  }

  return `Bearer ${res.body.token}`;
};

const loginGebruiker = async supertest => {
  const res = await supertest.post("/api/gebruiker/login").send({
    naam: "gebruiker",
    wachtwoord: "Test123",
  });

  if (res.statusCode !== 200) {
    throw new Error(res.body.message || "Unknown error occured");
  }

  return `Bearer ${res.body.token}`;
};

const withServer = setter => {
  let server;

  beforeAll(async () => {
    server = await createServer();

    setter({
      knex: getKnex(),
      supertest: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    await server.stop();
  });
};

module.exports = {
  loginMvoCoordinator,
  loginGebruiker,
  withServer,
};
const Router = require("@koa/router");
const gebruikerService = require("../service/gebruiker");
const Role = require("../core/rollen");
const validate = require("./_validation");
const Joi = require("joi");

const getAllGebruikers = async (ctx) => {
  const gebruikers = await gebruikerService.getAll();
  ctx.body = gebruikers;
};

const getGebruikerByName = async (ctx) => {
  const gebruiker = await gebruikerService.getGebruikerByName(ctx.params.naam);
  ctx.body = gebruiker;
};
getGebruikerByName.validationScheme = {
  params: {
    naam: Joi.string(),
  },
};

const getGebruikerById = async (ctx) => {
  const gebruiker = await gebruikerService.getGebruikerById(ctx.params.id);
  ctx.body = gebruiker;
};
getGebruikerById.validationScheme = {
  params: {
    id: Joi.number(),
  },
};

const login = async (ctx) => {
  const gebruiker = await gebruikerService.login(ctx.request.body);
  ctx.body = gebruiker;
};
login.validationScheme = {
  body: {
    naam: Joi.string().max(255),
    wachtwoord: Joi.string(),
  },
};

module.exports = function installGebruikerRouter(app) {
  const router = new Router({
    prefix: "/gebruiker",
  });

  router.get("/", getAllGebruikers);

  router.get(
    "/:naam",
    validate(getGebruikerByName.validationScheme),
    getGebruikerByName
  );

  router.get(
    "/id/:id",
    validate(getGebruikerById.validationScheme),
    getGebruikerById
  );

  router.post("/login", validate(login.validationScheme), login);

  app.use(router.routes()).use(router.allowedMethods());
};

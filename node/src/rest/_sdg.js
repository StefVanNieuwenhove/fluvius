const Router = require("@koa/router");
const sdgService = require("../service/sdg");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/rollen");
const validate = require("./_validation");
const Joi = require("joi");

const getAllSdgs = async ctx => {
  ctx.body = await sdgService.getAll();
};

const getSdgById = async ctx => {
  ctx.body = await sdgService.getSdgById(ctx.params.id);
};
getSdgById.validationScheme = {
  params: {
    id: Joi.number(),
  },
};

const getSdgByNaam = async ctx => {
  ctx.body = await sdgService.getSdgByNaam(ctx.params.naam);
};
getSdgByNaam.validationScheme = {
  params: {
    naam: Joi.string(),
  },
};

const getSdgByCategorie = async ctx => {
  ctx.body = await sdgService.getSdgByCategorie(ctx.params.cat);
};
getSdgByCategorie.validationScheme = {
  params: {
    cat: Joi.number(),
  },
};

module.exports = function installSdgRouter(app) {
  const router = new Router({
    prefix: "/sdg",
  });

  router.get("/", requireAuthentication, getAllSdgs);
  router.get("/id/:id", requireAuthentication, validate(getSdgById.validationScheme), getSdgById);
  router.get("/:naam", requireAuthentication, validate(getSdgByNaam.validationScheme), getSdgByNaam);

  router.get("/cat/:cat", requireAuthentication, validate(getSdgByCategorie.validationScheme), getSdgByCategorie);

  app.use(router.routes()).use(router.allowedMethods());
};

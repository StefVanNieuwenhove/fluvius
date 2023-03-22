const Router = require("@koa/router");
const catergorieService = require("../service/catergorie");
//const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/rollen");
const validate = require("./_validation");
const Joi = require("joi");

const getAll = async ctx => {
  ctx.body = await catergorieService.getAll();
};

const getCatById = async ctx => {
  ctx.body = await catergorieService.getCatById(ctx.params.id);
};
getCatById.validationScheme = {
  params: {
    id: Joi.number(),
  },
};

const getCatByNaam = async ctx => {
  ctx.body = await catergorieService.getCatByNaam(ctx.params.naam);
};
getCatByNaam.validationScheme = {
  params: {
    naam: Joi.string(),
  },
};

module.exports = function installCategorieRouter(app) {
  const router = new Router({
    prefix: "/categorie",
  });

  //const requireAdmin = makeRequireRole(Role.MVOCOORDINATOR);

  router.get("/", getAll);

  router.get(
    "/id/:id",
    validate(getCatById.validationScheme),

    getCatById
  );

  router.get(
    "/:naam",
    validate(getCatByNaam.validationScheme),

    getCatByNaam
  );

  app.use(router.routes()).use(router.allowedMethods());
};

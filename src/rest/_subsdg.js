const Router = require("@koa/router");
const Joi = require("joi");
const subService = require("../service/subsdg");
const {
  requireAuthentication,
  makeRequireRole
} = require("../core/auth");
const Role = require("../core/rollen");
const validate = require("./_validation");

const getAllSubs = async (ctx) => {
  ctx.body = await subService.getAll();
};

const getSubById = async (ctx) => {
  ctx.body = await subService.getSubById(ctx.params.id);
};
getSubById.validationScheme = {
  params: {
    id: Joi.number(),
  },
};

const getSubBySdg = async (ctx) => {
  ctx.body = await subService.getSubBySdg(ctx.params.sdg);
};
getSubBySdg.validationScheme = {
  params: {
    sdg: Joi.number(),
  },
};

module.exports = function installSubSdgRouter(app) {
  const router = new Router({
    prefix: "/subsdg",
  });

  router.get("/", requireAuthentication, getAllSubs);
  router.get(
    "/id/:id",
    requireAuthentication,
    validate(getSubById.validationScheme),
    getSubById
  );
  router.get(
    "/sdg/:sdg",
    requireAuthentication,
    validate(getSubBySdg.validationScheme),
    getSubBySdg
  );

  app.use(router.routes()).use(router.allowedMethods());
};
const Router = require("@koa/router");
const templateByUserService = require("../service/templateByUser");
const { requireAuthentication } = require("../core/auth");
const Role = require("../core/rollen");
const validate = require("./_validation");
const Joi = require("joi");

const getTemplateByUser = async (ctx) => {
  ctx.body = await templateByUserService.getById(ctx.params.gebruikerid);
};

const updateCatByUser = async (ctx) => {
  ctx.body = await templateByUserService.updateCatById(
    ctx.params.gebruikerid,
    ctx.request.body
  );
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/templatebyuser",
  });

  router.get("/:gebruikerid", requireAuthentication, getTemplateByUser);
  router.put("/cat/:gebruikerid", requireAuthentication, updateCatByUser);

  app.use(router.routes()).use(router.allowedMethods());
};

const Router = require("@koa/router");
const templateByRoleService = require("../service/templateByRole");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/rollen");
const validate = require("./_validation");
const Joi = require("joi");

const getTemplateByRole = async (ctx) => {
  ctx.body = await templateByRoleService.getByRol(ctx.params.rol);
};
getTemplateByRole.validationScheme = {
  params: {
    rol: Joi.string(),
  },
};

const updateCatByRole = async (ctx) => {
  ctx.body = await templateByRoleService.updateCatByRol(
    ctx.params.rol,
    ctx.request.body
  );
};
updateCatByRole.validationScheme = {
  params: {
    rol: Joi.string(),
  },
  body: {
    categorieen: Joi.string(),
  },
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/templatebyrole",
  });

  const requireMvocoordinator = makeRequireRole(Role.MVOCOORDINATOR);

  router.get(
    "/:rol",
    requireAuthentication,
    getTemplateByRole,
    validate(getTemplateByRole.validationScheme)
  );

  router.put(
    "/cat/:rol",
    requireAuthentication,
    requireMvocoordinator,
    updateCatByRole,
    validate(updateCatByRole.validationScheme)
  );

  app.use(router.routes()).use(router.allowedMethods());
};

const Router = require("@koa/router");
const rapportDSService = require("../service/rapportDS");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/rollen");

const getAll = async (ctx) => {
  ctx.body = await rapportDSService.getAll();
};

const createRapport = async (ctx) => {
  const newRapport = await rapportDSService.createRapport(ctx.request.body);
  ctx.body = newRapport;
  ctx.status = 201;
};

const deleteRapport = async (ctx) => {
  const deleteRapport = await rapportDSService.deleteRapport(ctx.params.id);
  ctx.body = deleteRapport;
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/rapportds",
  });

  const requireManager = makeRequireRole(Role.MANAGER);

  router.get("/", requireAuthentication,getAll);
  router.post("/", requireAuthentication, requireManager, createRapport);
  router.delete("/:id", requireAuthentication, requireManager, deleteRapport);

  app.use(router.routes()).use(router.allowedMethods());
};

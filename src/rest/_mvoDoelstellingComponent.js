const Router = require("@koa/router");
const mvoDoelstellingComponentService = require("../service/mvodoelstellingcomponent");

const getAllMvoDoelstellingen = async (ctx) => {
  ctx.body = await mvoDoelstellingComponentService.getAll();
}

const getAllMvoDoelstellingenById = async (ctx) => {
  ctx.body = await mvoDoelstellingComponentService.getAllById(ctx.params.id);
}

const getAllSubMvoDoelstellingen = async (ctx) => {
  ctx.body = await mvoDoelstellingComponentService.getAllSubs();
}

const getAllMvoDoelstellingenBySubsdg = async (ctx) => {
  ctx.body = await mvoDoelstellingComponentService.getAllBySubsdg(ctx.params.id);
}

const getAllSubMvoDoelstellingenByMvo = async (ctx) => {
  ctx.body = await mvoDoelstellingComponentService.getAllSubsbyMvo(ctx.params.id);
}

module.exports = (app) => {
  const router = new Router({
    prefix: "/mvodoelstelling",
  });

  //publieke routes
  router.get("/", getAllMvoDoelstellingen);
  router.get("/:id", getAllMvoDoelstellingenById);
  router.get("/sub", getAllSubMvoDoelstellingen);
  router.get("/subsdg/:id", getAllMvoDoelstellingenBySubsdg);
  router.get("/sub/mvo/:id", getAllSubMvoDoelstellingenByMvo);

  app.use(router.routes()).use(router.allowedMethods());
};
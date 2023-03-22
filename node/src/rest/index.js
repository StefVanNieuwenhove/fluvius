const Router = require("@koa/router");
const installMvoDoelstellingComponentRouter = require("./_mvoDoelstellingComponent");
const installGebruikerRouter = require("./_gebruiker");
const installCategorieRouter = require("./_categorie");
const installSdgRouter = require("./_sdg");
const installSubSdgRouter = require("./_subsdg");
const installDatasourceRouter = require("./_datasource");
const templateByRoleRouter = require("./_templateByRole");
const templateByUserRouter = require("./_templateByUser");
const rapportDSRouter = require("./_rapportDS");

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installGebruikerRouter(router);
  installMvoDoelstellingComponentRouter(router);
  installSdgRouter(router);
  installCategorieRouter(router);
  installSubSdgRouter(router);
  installDatasourceRouter(router);
  templateByRoleRouter(router);
  templateByUserRouter(router);
  rapportDSRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
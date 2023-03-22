const Router = require("@koa/router");
const datasourceService = require("../service/datasource");

const getAllDatasources = async (ctx) => {
    ctx.body = await datasourceService.getAll();
};

const getDatasourceById = async (ctx) => {
    ctx.body = await datasourceService.getDatasourceById(ctx.params.id);
};

module.exports = function installDatasourceRouter(app) {
    const router = new Router({
        prefix: "/datasource",
    });

    router.get("/", getAllDatasources);
    router.get("/id/:id", getDatasourceById);

    app.use(router.routes()).use(router.allowedMethods());
}
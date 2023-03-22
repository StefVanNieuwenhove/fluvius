const gebruikerService = require("../service/gebruiker");

module.exports.requireAuthentication = async (ctx, next) => {
  const { authorization } = ctx.headers;

  const { authToken, ...session } = await gebruikerService.checkAndParseSession(
    authorization
  );
  ctx.state.session = session;
  ctx.state.authToken = authToken;

  return next();
};

module.exports.makeRequireRole = (role) => async (ctx, next) => {
  const { roles = [] } = ctx.state.session;

  gebruikerService.checkRole(role, roles);
  return next();
};

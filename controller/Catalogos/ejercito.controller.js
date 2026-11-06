const {
  getEjercitoSql,
} = require("../../database/repositories/Ejercito/ejercito.Repositories");
const { validarTenant } = require("../../helpers/requestValidator");

async function getEjercito(req, reply) {
  try {
    const parametros = req.query;
    const tenant = req.tenant;

    if (!validarTenant(reply, tenant)) {
      return;
    }
    const datos = await getEjercitoSql(tenant.subdominio, parametros);

    reply.status(200).send(datos);
  } catch (error) {
    reply.status(400).send(error);
  }
}

module.exports = {
  getEjercito,
};

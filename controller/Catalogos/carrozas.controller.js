const {
  getCarrozasSql,
} = require("../../database/repositories/Carrozas/carrozas.Repositories");
const { validarTenant } = require("../../helpers/requestValidator");

async function getCarrozas(req, reply) {
  try {
    const parametros = req.query;
    const tenant = req.tenant;

    if (!validarTenant(reply, tenant)) {
      return;
    }
    const datos = await getCarrozasSql(tenant.subdominio, parametros);

    reply.status(200).send(datos);
  } catch (error) {
    reply.status(400).send(error);
  }
}

module.exports = {
  getCarrozas,
};
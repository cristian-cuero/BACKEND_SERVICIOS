const {
  getTipoServicioSql,
} = require("../../database/repositories/TipoServicio/tiposervicio.Repositories");
const { validarTenant } = require("../../helpers/requestValidator");

async function getTipoServicio(req, reply) {
  try {
    const parametros = req.query;
    const tenant = req.tenant;

    if (!validarTenant(reply, tenant)) {
      return;
    }
    const datos = await getTipoServicioSql(tenant.subdominio, parametros);

    reply.status(200).send(datos);
  } catch (error) {
    reply.status(400).send(error);
  }
}

module.exports = {
  getTipoServicio,
};

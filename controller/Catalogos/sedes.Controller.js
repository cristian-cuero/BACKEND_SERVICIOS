const { sede } = require("../../config/paths");
const {
  getSedesSql,
} = require("../../database/repositories/Sedes/sedes.repositories");
const { validarTenant } = require("../../helpers/requestValidator");

async function getSedes(req, reply) {
  try {
    const parametros = req.query;
    const tenant = req.tenant; // Obtener tenant del request

    if (!validarTenant(reply, tenant)) {
      return;
    }

    const sedes = await getSedesSql(tenant.subdominio, parametros);

    reply.status(200).send(sedes);
  } catch (error) {

    reply.status(400).send({ message: error.message });
  }
}

module.exports = {
  getSedes,
};

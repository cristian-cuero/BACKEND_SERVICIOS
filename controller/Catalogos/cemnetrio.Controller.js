const { getcementerioSql } = require("../../database/repositories/cementerio/cementerio.repositories");
const { validarTenant } = require("../../helpers/requestValidator");

const getCementerios = async (req, reply) => {
  try {
    const parametros = req.query;
    const tenant = req.tenant; // Obtener tenant del request

    if (!validarTenant(reply, tenant)) {
      return;
    }
    const datos = await getcementerioSql(tenant.subdominio, parametros);
    reply.status(200).send(datos);
  } catch (error) {
    reply.status(400).send({ message: error.message });
  }
};


module.exports = { getCementerios };
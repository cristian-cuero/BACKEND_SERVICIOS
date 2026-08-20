const {
  getParentescoSql,
} = require("../../database/repositories/Parentesco/parentesco.repositories");
const { validarTenant } = require("../../helpers/requestValidator");

async function getParentesco(req, reply) {
  try {
    const parametros = req.query;
    const tenant = req.tenant; // Obtener tenant del request

    // validamos que sea un tenant valido
    if (!validarTenant(reply, tenant)) {
      return;
    }
    const datos = await getParentescoSql(tenant.subdominio, parametros);

    reply.status(200).send(datos);
  } catch (error) {
    reply.status(400).send({ message: error.message });
  }
}

module.exports = {
  getParentesco,
};

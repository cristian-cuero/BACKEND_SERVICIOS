const {
  getCategoriasSql,
} = require("../../database/repositories/Categorias/categorias.Repositories");
const { validarTenant } = require("../../helpers/requestValidator");

async function getCategorias(req, reply) {
  try {
    const parametros = req.query;
    const tenant = req.tenant;

    if (!validarTenant(reply, tenant)) {
      return;
    }
    const datos = await getCategoriasSql(tenant.subdominio, parametros);

    reply.status(200).send(datos);
  } catch (error) {
    reply.status(400).send(error);
  }
}

module.exports = {
  getCategorias,
};
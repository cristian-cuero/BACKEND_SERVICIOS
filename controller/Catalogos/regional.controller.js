const {
  getDepartamentoSQL,
  getCiudadSQL,
} = require("../../database/repositories/regional/regional.repositories");
const { validarTenant } = require("../../helpers/requestValidator");

const getDepartamento = async (req, reply) => {
  try {
    const parametros = req.query;
    const tenant = req.tenant; // Obtener tenant del request

    if (!validarTenant(reply, tenant)) {
      return;
    }
    const datos = await getDepartamentoSQL(tenant.subdominio, parametros);

    reply.send(datos);
  } catch (error) {
    reply.status(400).send(error);
  }
};

const getCiudad = async (req, reply) => {
  try {
    const parametros = req.query;
    const tenant = req.tenant; // Obtener tenant del request

    if (!validarTenant(reply, tenant)) {
      return;
    }

    const datos = await getCiudadSQL(tenant.subdominio, parametros);

    reply.status(400).send(datos)

  } catch (error) {
    reply.status(400).send(error);
  }
};

module.exports = {
  getDepartamento,
  getCiudad
};

const { getEstadoServiciosSQL } = require("../../database/repositories/estadoServicio/estadoServicio.repositories");
const { validarTenant } = require("../../helpers/requestValidator");

const getEstadosServicios = async (req, reply) => {
  try {
    const parametros = req.query;
    const tenant = req.tenant; // Obtener tenant del request

    if (!validarTenant(reply, tenant)) {
      return;
    }
    const datos = await getEstadoServiciosSQL(tenant.subdominio, parametros)
    reply.status(200).send(datos)
  } catch (error) {
    reply.status(400).send({ message: error.message });
  }
};


module.exports ={
    getEstadosServicios
}
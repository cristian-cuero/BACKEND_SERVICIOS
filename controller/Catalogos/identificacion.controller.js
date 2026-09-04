const { getIdentificacionSQL } = require("../../database/repositories/identificacion/identificacion.repositories");
const { validarTenant } = require("../../helpers/requestValidator");

const getIdentificacion = async (req, reply) => {
  try {
    const tenant  = req.tenant;

    if (!validarTenant(reply, tenant)) {
      return;
    }

   const datos = await getIdentificacionSQL( tenant.subdominio) ;

   reply.send(datos);
  } catch (error) {

    reply.status(400).send(error)
  }
};


module.exports = {getIdentificacion}
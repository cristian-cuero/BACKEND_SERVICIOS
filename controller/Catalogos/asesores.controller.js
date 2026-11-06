const {
  getAsesoresSql,
} = require("../../database/repositories/Asesores/asesores.Repositories");
const { validarTenant } = require("../../helpers/requestValidator");

async function getAsesores(req, reply) {
  try {
    const parametros = req.query;
    const tenant = req.tenant;

    if (!validarTenant(reply, tenant)) {
      return;
    }
    const datos = await getAsesoresSql(tenant.subdominio, parametros);

    const datosFormateados = datos.map((item) => {
        // Obtenemos los valores intentando acceder a varias llaves posibles
        const apellidos = (item.APELLIDOS || item.apellidos || "");
        const nombres = (item.NOMBRES || item.nombres || "");

        return {
            NOMBRE_COMPLETO: `${apellidos.trim()} ${nombres.trim()}`
        };
    });

    reply.status(200).send(datosFormateados);
  } catch (error) {
    reply.status(400).send(error);
  }
}

module.exports = {
  getAsesores,
};
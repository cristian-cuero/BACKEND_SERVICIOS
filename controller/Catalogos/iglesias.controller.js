const {
  getIglesiasSql,
} = require("../../database/repositories/Iglesias/iglesias.Repositories");
const { validarTenant } = require("../../helpers/requestValidator");

async function getIglesias(req, reply) {
  try {
    const parametros = req.query;
    const tenant = req.tenant; // Obtener tenant del request

    // validamos que sea un tenant valido
    if (!validarTenant(reply, tenant)) {
      return;
    }
    const datos = await getIglesiasSql(tenant.subdominio, parametros);
    console.log('Datos recibidos de BD:', datos);

    const datosFormateados = datos.map((item) => ({
      // Intentamos acceder tanto en mayúsculas como en minúsculas por si acaso
      IGLESIA_CIUDAD: `${((item.IGLESIA || item.iglesia) || "").trim()} - ${((item.CIUDAD || item.ciudad) || "").trim()}`,
    }));

    reply.status(200).send(datosFormateados);
  } catch (error) {
    reply.status(400).send(error);
  }
}

module.exports = {
  getIglesias,
};
const {
  pagosContrato,
} = require("../database/repositories/pagos/pagos.repositories");
const { validarTenant } = require("../helpers/requestValidator");
const {
  getTipoPagosSQL,
} = require("../database/repositories/pagos/tipopagos.repositories");

async function loadPagosServicios(req, reply) {
  try {
    const { idscontrato } = req.params; // Obtener el ID de la prestación de los parámetros de la consulta
    const tenant = req.tenant; // Obtener tenant del request

    // validamos que sea un tenant valido
    if (!validarTenant(reply, tenant)) {
      return;
    }
    const pagos = await pagosContrato(tenant.subdominio, idscontrato); // Llamar a la función loadPagosServicios con el ID de la prestación
    reply.send(pagos); // Enviar la respuesta con los pagos obtenidos
  } catch (error) {
    reply.status(400).send(error);
  }
}

//cagar El Tipo De Pago

async function loadTipopagos(req, reply) {
  try {
    const parametros = req.query; // Obtener el ID de la prestación de los parámetros de la consulta
    const tenant = req.tenant; // Obtener tenant del request

    if (!validarTenant(tenant, reply)) {
      return;
    }

    const datos = await getTipoPagosSQL(tenant.subdominio, parametros);

    reply.send(datos);
  } catch (error) {
    reply.status(400).send(error);
  }
}

module.exports = {
  loadPagosServicios,
  loadTipopagos
};

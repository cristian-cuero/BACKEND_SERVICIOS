const {
  loadFallecidos,
  loadFallecidosByParam,
  loadPrestacionQuery,
} = require("../database/repositories/Fallecidos/fallecidos.repositories");
const { validarTenant } = require("../helpers/requestValidator");

async function loadServices(req, reply) {
  try {
    const { desde, hasta } = req.query; // Obtener fechas desde y hasta de los parámetros de la consulta
    const tenant = req.tenant; // Obtener tenant del request

    // validamos que sea un tenant valido
    if (!validarTenant(reply, tenant)) {
      return;
    }

    if (!desde || !hasta) {
      return reply
        .status(400)
        .send({ message: "Las fechas 'desde' y 'hasta' son requeridas" });
    }

    if (isNaN(Date.parse(desde)) || isNaN(Date.parse(hasta))) {
      return reply
        .status(400)
        .send({ message: "Las fechas 'desde' y 'hasta' deben ser válidas" });
    }
    if (new Date(desde) > new Date(hasta)) {
      return reply.status(400).send({
        message: "La fecha 'desde' no puede ser mayor que la fecha 'hasta'",
      });
    }

    // 🔥 Llamar a la función loadFallecidos con el subdominio del tenant y las fecha   carglo los fallecidos
    const services = await loadFallecidos(tenant.subdominio, desde, hasta); // Llamar a la función loadFallecidos con el pool dinámico
    return reply.status(200).send(services);
  } catch (error) {
    reply.status(400).send({ message: error.message });
  }
}

async function loadServicesParam(req, reply) {
  try {
    const { dato, parametro } = req.query; // Obtener fechas desde y hasta de los parámetros de la consulta
    const tenant = req.tenant; // Obtener tenant del request
    // validamos que sea un tenant valido
    if (!validarTenant(reply, tenant)) {
      return;
    }
    if (!dato || !parametro) {
      return reply.status(400).send({
        message: "Los parámetros 'dato' y 'parametro' son requeridos",
      });
    }

    const services = await loadFallecidosByParam(
      tenant.subdominio,
      dato,
      parametro,
    ); // Llamar a la función loadFallecidos con el pool dinámico
    return reply.status(200).send(services);
  } catch (error) {
    reply.status(400).send({ message: error.message });
  }
}

async function loadPrestacion(req, reply) {
  try {
    const { id } = req.params; // Obtener el ID de la prestación de los parámetros de la consulta
    const tenant = req.tenant; // Obtener tenant del request

    // validamos que sea un tenant valido
    if (!validarTenant(reply, tenant)) {
      return;
    }

    prestacion = await loadPrestacionQuery(tenant.subdominio, id); // Llamar a la función loadPrestacion con el pool dinámico

    return reply.status(200).send(prestacion);
  } catch (error) {
    reply.status(400).send({ message: error.message });
  }
}

module.exports = {
  loadServices,
  loadServicesParam,
  loadPrestacion,
};

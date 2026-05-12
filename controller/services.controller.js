const { loadFallecidos } = require("../database/repositories/Fallecidos/fallecidos.repositories");

async function loadServices(req, reply) {
  try {
    const { desde, hasta } = req.query; // Obtener fechas desde y hasta de los parámetros de la consulta
    const tenant = req.tenant; // Obtener tenant del request

    if (!tenant) {
      return reply
        .status(400)
        .send({ message: "Tenant no encontrado en la solicitud" });
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
      return reply
        .status(400)
        .send({
          message: "La fecha 'desde' no puede ser mayor que la fecha 'hasta'",
        });
    }

    // 🔥 Llamar a la función loadFallecidos con el subdominio del tenant y las fecha   carglo los fallecidos 
    const services = await  loadFallecidos(tenant.subdominio , desde, hasta); // Llamar a la función loadFallecidos con el pool dinámico
    return reply.status(200).send(services);
  } catch (error) {
    reply.status(400).send({ message: error.message });
  }
}


module.exports = {
  loadServices
};

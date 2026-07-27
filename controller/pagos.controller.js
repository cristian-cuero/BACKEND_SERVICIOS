async function loadPagosServicios(req, reply) {
  try {
    const { idscontrato } = req.params; // Obtener el ID de la prestación de los parámetros de la consulta
    const tenant = req.tenant; // Obtener tenant del request

    // validamos que sea un tenant valido
    if (!validarTenant(reply, tenant)) {
      return;
    }
    const pagos = await pagosContrato(tenant, idscontrato); // Llamar a la función loadPagosServicios con el ID de la prestación
    reply.send(pagos); // Enviar la respuesta con los pagos obtenidos
  } catch (error) {
    reply.status(400).send({ message: error.message });
  }
}

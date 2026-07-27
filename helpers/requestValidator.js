function validarTenant(reply, tenant) {
  if (!tenant) {
    reply.status(400).send({
      message: "Tenant no encontrado en la solicitud",
    });
    return false;
  }

  return true;
}

module.exports = {
  validarTenant,
};
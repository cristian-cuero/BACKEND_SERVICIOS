const { default: fastify } = require("fastify");
const { validarJWT } = require("../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get("/loadPagosServicios/:idscontrato", {
    preHandler: [validarJWT],
  });
};

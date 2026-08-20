
const { validarJWT } = require("../middleware/validarJWT");
const { loadPagosServicios } = require("../controller/pagos.controller");

module.exports = (fastify) => {
  fastify.get("/loadPagosServicios/:idscontrato", {
    preHandler: [validarJWT],
  }, loadPagosServicios);
};

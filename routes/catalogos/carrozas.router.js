const { getCarrozas } = require("../../controller/Catalogos/carrozas.controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get(
    "/",
    {
      preHandler: [validarJWT],
    },
    getCarrozas
  );
};
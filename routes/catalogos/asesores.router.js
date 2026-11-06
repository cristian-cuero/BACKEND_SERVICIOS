const { getAsesores } = require("../../controller/Catalogos/asesores.controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get(
    "/",
    {
      preHandler: [validarJWT],
    },
    getAsesores
  );
};
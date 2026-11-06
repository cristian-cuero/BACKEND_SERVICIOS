const { getEjercito } = require("../../controller/Catalogos/ejercito.controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get(
    "/",
    {
      preHandler: [validarJWT],
    },
    getEjercito
  );
};

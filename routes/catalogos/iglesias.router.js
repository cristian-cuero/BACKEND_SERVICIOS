const {
  getIglesias,
} = require("../../controller/Catalogos/iglesias.controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get(
    "/",
    {
      preHandler: [validarJWT],
    },
    getIglesias,
  );
};
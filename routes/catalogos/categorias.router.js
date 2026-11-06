const {
  getCategorias,
} = require("../../controller/Catalogos/categorias.controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get(
    "/",
    {
      preHandler: [validarJWT],
    },
    getCategorias,
  );
};
const {
  getTipoServicio,
} = require("../../controller/Catalogos/tiposervicio.controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get(
    "/",
    {
      preHandler: [validarJWT],
    },
    getTipoServicio
  );
};

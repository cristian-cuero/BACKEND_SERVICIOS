const { getBancos } = require("../../controller/Catalogos/banco.controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get("/loadBancos", {
    preHandler: [validarJWT],
    schema: {
      querystring: {
        type: "object",
        properties: {
          CODIGO: {
            type: "string",
          },
          BANCO: {
            type: "string"
          },

        },
      },
    },
  }, getBancos);
};

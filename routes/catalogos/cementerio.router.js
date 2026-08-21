
const { getCementerios } = require("../../controller/Catalogos/cemnetrio.Controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get(
    "/loadCementerio",
    {
      preHandler: [validarJWT],
      schema: {
        querystring: {
          type: "object",
          properties: {
            IDCEMENTERIO: {
              type: "integer",
            },
            CEMENTERIO: {
              type: "string",
            },
            ESTADO: {
              type: "integer",
            },
          },
        },
      },
    },
    getCementerios,
  );
};

const { loadServices, loadServicesParam, loadPrestacion } = require("../controller/services.controller");
const { validarJWT } = require("../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get(
    "/loadServices",
    {
      preHandler: [validarJWT],

      schema: {
        querystring: {
          type: "object",

          required: ["desde", "hasta"],

          properties: {
            desde: {
              type: "string",
              format: "date",
            },

            hasta: {
              type: "string",
              format: "date",
            },
          },
        },
      },
    },
    loadServices,
  );

  fastify.get(
    "/loadServicesByParam",
    {
      preHandler: [validarJWT],

      schema: {
        querystring: {
          required: ["dato", "parametro"],
        },
      },
    },
    loadServicesParam,
  );

  fastify.get(
    "/loadPrestacion/:id",
    {
      preHandler: [validarJWT],

    },
    loadPrestacion
  )
};

const { loadServices, loadServicesParam, loadPrestacion, createOrdenServicio } = require("../controller/services.controller");
const { validarJWT } = require("../middleware/validarJWT");
const { ordenFallecidoSchema } = require("../schema/ordenFallecido.schema");

module.exports = (fastify) => {
  // Rutas de consulta
  fastify.get(
    "/loadServices",
    {
      preHandler: [validarJWT],
      schema: {
        querystring: {
          type: "object",
          required: ["desde", "hasta"],
          properties: {
            desde: { type: "string", format: "date" },
            hasta: { type: "string", format: "date" },
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
  );

  // Ruta de creación
  fastify.post(
    "/create",
    {
      preHandler: [validarJWT],
      schema: ordenFallecidoSchema,
    },
    createOrdenServicio
  );
};

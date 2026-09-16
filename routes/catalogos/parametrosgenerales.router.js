const {
  loadConvenios,
  loadEstadoServicio,
} = require("../../controller/Catalogos/parametrosGenerales/Generales.controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get(
    "/loadConvenios",
    {
      preHandler: [validarJWT],
      schema: {
        querystring: {
          type: "object",
          properties: {
            ESTADO: {
              type: "integer",
            },
            CONVENIO: {
              type: "string",
            },
          },
        },
      },
    },
    loadConvenios,
  );

  fastify.get("/loadEstadoServicio", {
    preHandler: [validarJWT],
    schema: {
      querystring: {
        type: "object",
        properties: {
          ESTADO: {
            type: "integer",
          },
          NOMBRE: { 
            type: "string"
          }
        },
      },
    },
  }, loadEstadoServicio);
};

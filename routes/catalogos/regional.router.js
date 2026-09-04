const {
  getDepartamento,
  getCiudad,
} = require("../../controller/Catalogos/regional.controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get(
    "/departamento",
    {
      preHandler: [validarJWT],
      schema: {
        querystring: {
          type: "object",
          properties: {
            IDDEPARTAMENTO: {
              type: "integer",
            },
            DEPARTAMENTO: {
              type: "string",
            },
            CODDANE: {
              type: "string",
            },
          },
        },
      },
    },
    getDepartamento,
  );

  fastify.get("/loadciudad", {
    preHandler: [validarJWT],
    schema: {
      querystring: {
        type: "object",
        properties: {
          IDMUNICIPIO: {
            type: "integer",
          },
          MUNICIPIO: {
            type: "string",
          },
          CODDANE: {
            type: "string",
          },
          CODDEPARTAMENTO:{
            type: "string"
          }
        },
      },
    },
  }, getCiudad);
};

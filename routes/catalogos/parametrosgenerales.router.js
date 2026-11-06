const {
  loadConvenios,
  loadEstadoServicio,
  loadCategorias,
  loadTipoServicio,
  loadDepartamentos,
  loadAuxilios,
  loadCategoriasGrupo,
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

  // Nuevas rutas
  fastify.get("/loadCategorias", { preHandler: [validarJWT] }, loadCategorias);
  fastify.get("/loadTipoServicio", { preHandler: [validarJWT] }, loadTipoServicio);
  fastify.get("/loadDepartamentos", { preHandler: [validarJWT] }, loadDepartamentos);
  fastify.get("/loadAuxilios", { preHandler: [validarJWT] }, loadAuxilios);
  fastify.get("/loadCategoriasGrupo", { preHandler: [validarJWT] }, loadCategoriasGrupo);
};

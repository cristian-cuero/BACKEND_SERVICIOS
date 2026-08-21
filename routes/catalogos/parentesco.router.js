
const { getParentesco } = require("../../controller/Catalogos/parentesco.Controller");
const { validarJWT } = require("../../middleware/validarJWT");

module.exports = (fastify) => {
  fastify.get("/loadParentesco", {
    preHandler: [validarJWT],
    schema: {
      querystring: {
        type: "object",
        properties: {
          IDPARENTESCO: {
            type: "integer",
          },
          PARENTESCO: {
            type: "string",
          },
        },
      },
    },
  }, getParentesco);
};

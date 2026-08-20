
const { getSedes } = require("../controller/Catalogos/sedes.Controller")
const { validarJWT } = require("../middleware/validarJWT")


module.exports = (fastify) => { 

    fastify.get(
        "/loadSedes",
        {
            preHandler: [validarJWT],
            schema: {
                querystring: {
                    type: "object",
                    properties: {
                        IDSEDE: {
                            type: "integer",
                        },
                        SEDE: {
                            type: "string",
                        },
                        CC_FACTURA:{
                            type: "string",
                        },
                        ESBODEGA:{
                            type: "integer",
                        }
                    }
                }
            }
        },
        getSedes
    )
}
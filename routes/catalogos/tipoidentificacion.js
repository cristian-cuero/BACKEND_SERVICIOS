const { getIdentificacion } = require("../../controller/Catalogos/identificacion.controller")
const { validarJWT } = require("../../middleware/validarJWT")




module.exports = (fastify ) => {

    fastify.get("/loadIdentificacion", {
        preHandler:[validarJWT],
        
    } ,getIdentificacion)
}


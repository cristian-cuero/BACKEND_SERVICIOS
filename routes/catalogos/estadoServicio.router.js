const { getEstadosServicios } = require("../../controller/Catalogos/estadoServicio.controller");

const { validarJWT } = require("../../middleware/validarJWT");

module.exports = async(fastify)=> {

    fastify.get('/loadEstadoServicio', {
        
        preHandler:[validarJWT],
        schema:{
            querystring:{
                type: "object",
                properties:{
                    IDESTADO: {
                        type: "integer"
                    },
                    ESTADO:{
                        type: "string"
                    }

                }
            }
        }
    }, getEstadosServicios);

}
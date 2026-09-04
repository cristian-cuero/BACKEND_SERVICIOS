
const { validarJWT } = require("../middleware/validarJWT");
const { loadPagosServicios , loadTipopagos} = require("../controller/pagos.controller");

module.exports = (fastify) => {
  fastify.get("/loadPagosServicios/:idscontrato", {
    preHandler: [validarJWT],
  }, loadPagosServicios);


  fastify.get("/loadTipospAgos", {  

    preHandler:[validarJWT],
    schema:{
      querystring:{
        type: "object",
        properties:{
            IDTIPOPAGO:{
              type:"integer"
            },
            TIPOPAGO:{
               type: "string"
            }

        }

      }
    }

  }, loadTipopagos)
  
};

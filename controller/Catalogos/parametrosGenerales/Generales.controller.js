// Manejanos Convenios

const { validarTenant } = require("../../../helpers/requestValidator");
const { getConvenios, getEstadoServicio } = require("../../../database/repositories/catalogos/generaleRepository");

// ----------------------------------PARTE DE CONVENIOS
const loadConvenios = async (req, reply) => {
  try {
    const paramatros = req.query;
    const tenant = req.tenant;

    if (!validarTenant (reply, tenant)) {
      return;
    }  
    
    const datos = await getConvenios (tenant.subdominio, paramatros);

    reply.send(datos);
  } catch (error) {
    reply.status(500).send(error)
  }
};



// ----------------------------------PARTE DE  ESTADO DE SERVICIOS


const loadEstadoServicio = async (req, reply) => {
  try {
    const paramatros = req.query;
    const tenant = req.tenant;  

    if (!validarTenant (reply, tenant)) {
      return;
    }

    const datos = await getEstadoServicio (tenant.subdominio, paramatros);
    reply.send(datos);  
  } catch (error) {
    reply.status(500).send(error)
  }
};

module.exports = {
  loadConvenios,
    loadEstadoServicio
};

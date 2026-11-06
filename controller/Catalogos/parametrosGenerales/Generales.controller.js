const { validarTenant } = require("../../../helpers/requestValidator");
const {
    getConvenios,
    getEstadoServicio,
    getCategorias,
    getTipoServicio,
    getDepartamentos,
    getAuxilios,
    getCategoriasGrupo
} = require("../../../database/repositories/catalogos/generaleRepository");

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

// ----------------------------------NUEVOS MÉTODOS

const createLoader = (repositoryMethod) => async (req, reply) => {
  try {
    const paramatros = req.query;
    const tenant = req.tenant;

    if (!validarTenant(reply, tenant)) {
      return;
    }

    const datos = await repositoryMethod(tenant.subdominio, paramatros);
    reply.send(datos);
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = {
  loadConvenios,
  loadEstadoServicio,
  loadCategorias: createLoader(getCategorias),
  loadTipoServicio: createLoader(getTipoServicio),
  loadDepartamentos: createLoader(getDepartamentos),
  loadAuxilios: createLoader(getAuxilios),
  loadCategoriasGrupo: createLoader(getCategoriasGrupo)
};

const { ejecutarConsulta } = require("../../PoolConsulta");

const pagosContrato = async (db, idscontrato) => {
  return ejecutarConsulta( db,
    "SELECT * FROM SP_CONSULTAR_ABONOS(?)",
    [idscontrato],
    
  );
};

module.exports = {
  pagosContrato,
};  

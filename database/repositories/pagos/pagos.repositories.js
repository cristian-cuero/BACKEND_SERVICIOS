const { ejecutarConsulta } = require("../../PoolConsulta");

const pagosContrato = async (db, idscontrato) => {
  return ejecutarConsulta(
    "SELECT * FROM SP_CONSULTAR_PAGOS(?)",
    [idscontrato],
    db,
  );
};

module.exports = {
  pagosContrato,
};  

const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");

const getCarrozasSql = async (db, parametros) => {
  let query = "SELECT PLACA ||' '||MARCA ||' '|| COLOR FROM TBLCARROZAS WHERE ESTADO=0 ORDER BY PLACA";

  const [sqlWhere, valores] = construirWhere(parametros, query);

  return ejecutarConsulta(db, sqlWhere, valores);
};

module.exports = {
  getCarrozasSql,
};
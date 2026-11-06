const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");

const getIglesiasSql = async (db, parametros) => {
  let query = "SELECT IGLESIA, CIUDAD FROM TBLIGLESIAS ORDER BY IGLESIA";

  const [sqlWhere, valores] = construirWhere(parametros, query);

  return ejecutarConsulta(db, sqlWhere, valores);
};

module.exports = {
  getIglesiasSql,
};
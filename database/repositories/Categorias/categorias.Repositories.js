const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");

const getCategoriasSql = async (db, parametros) => {
  let query = "SELECT CATEGORIA FROM TBLCATEGORIAS WHERE ESTADO = 0 ORDER BY CATEGORIA";

  const [sqlWhere, valores] = construirWhere(parametros, query);

  return ejecutarConsulta(db, sqlWhere, valores);
};

module.exports = {
  getCategoriasSql,
};
const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");

const getParentescoSql = async (db, parametros) => {
  let query = "SELECT *  FROM TBLPARENTESCO";

  const [sqlWhere, valores] = construirWhere(parametros, query);


  return ejecutarConsulta(db, sqlWhere, valores);
};

module.exports = {
  getParentescoSql,
};

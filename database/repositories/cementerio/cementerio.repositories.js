const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");

async function getcementerioSql(db, parametros) {
  let query = `SELECT * FROM TBLCEMENTERIOS `;

  let [sqlWhere, valores] = construirWhere(parametros, query);

  sqlWhere += " ORDER BY CIUDAD ASC";

  return await ejecutarConsulta(db, sqlWhere, valores);

}

module.exports = {
  getcementerioSql,
};

const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");

async function getcementerioSql(db, parametros) {
  let query = `SELECT * FROM TBLCEMENTERIOS `;

  let [sqlWhere, valores] = construirWhere(parametros, query);

  sqlWhere += " ORDER BY CIUDAD ASC";

  return await ejecutarConsulta(db, sqlWhere, valores);

}

// Nuevo método específico para llenar combo de ciudades (como en VB6)
async function getCiudadesCementerio(db) {
  const query = `SELECT DISTINCT UPPER(CIUDAD) AS CIUDAD FROM TBLCEMENTERIOS ORDER BY CIUDAD`;
  return await ejecutarConsulta(db, query, []);
}

module.exports = {
  getcementerioSql,
  getCiudadesCementerio,
};

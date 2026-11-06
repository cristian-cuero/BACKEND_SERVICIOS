const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");

const getTipoServicioSql = async (db, parametros) => {
  let query = "SELECT DESCRIPCION FROM TBLTIPOSERVICIO WHERE ESTADO = 0 ORDER BY DESCRIPCION";

  const [sqlWhere, valores] = construirWhere(parametros, query);

  return ejecutarConsulta(db, sqlWhere, valores);
};

module.exports = {
  getTipoServicioSql,
};
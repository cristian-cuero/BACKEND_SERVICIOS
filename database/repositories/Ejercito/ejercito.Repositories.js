const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");

const getEjercitoSql = async (db, parametros) => {
  let query = "SELECT GRADO FROM tblEJERCITO";

  const [sqlWhere, valores] = construirWhere(parametros, query);

  return ejecutarConsulta(db, sqlWhere, valores);
};

module.exports = {
  getEjercitoSql,
};

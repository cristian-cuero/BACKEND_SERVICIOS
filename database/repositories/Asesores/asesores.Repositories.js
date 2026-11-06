const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");

const getAsesoresSql = async (db, parametros) => {
  // Quitamos la concatenación del SQL y usamos campos separados para evitar problemas de charset
  let query = "SELECT DISTINCT APELLIDOS, NOMBRES FROM VASESORES A, TBLCARGOS C WHERE C.idcargo=A.idcargo AND A.ESTADO=0";

  // Si viene un filtro de cargo en los parámetros, lo añadimos al WHERE de forma segura
  if (parametros && parametros.cargo) {
    // Escapamos el cargo si es necesario o simplemente usamos el valor recibido
    // Asumiendo que 'parametros.cargo' viene como '%Asesor%Servicio%'
    query += " AND CARGO LIKE '" + parametros.cargo.replace(/'/g, "''") + "'";
  }

  query += " ORDER BY APELLIDOS, NOMBRES";

  return ejecutarConsulta(db, query, []);
};

module.exports = {
  getAsesoresSql,
};
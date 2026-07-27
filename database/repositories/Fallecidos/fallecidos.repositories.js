const { normalizeRow } = require("../../../helpers/normalizeUTF8");
const { ejecutarConsulta } = require("../../PoolConsulta");

// Cargar órdenes entre dos fechas
const loadFallecidos = async (db, desde, hasta) => {
  const fallecidos = await ejecutarConsulta(
    db,
    "SELECT * FROM P_CARGARORDENES(?, ?)",
    [desde, hasta]
  );

  return normalizeRow(fallecidos);
};

// Consultar fallecido por parámetro
const loadFallecidosByParam = async (db, dato, parametro) => {
  return ejecutarConsulta(
    db,
    "SELECT * FROM SP_CONSULTAR_FALLECIDO(?, ?)",
    [dato, parametro]
  );
};

// Consultar prestación
const loadPrestacionQuery = async (db, dato) => {
  return ejecutarConsulta(
    db,
    "SELECT * FROM SP_CONSULTAR_PRESTACION(?)",
    [dato]
  );
};

module.exports = {
  loadFallecidos,
  loadFallecidosByParam,
  loadPrestacionQuery,
};
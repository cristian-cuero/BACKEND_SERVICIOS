const { normalizeRow } = require("../../../helpers/normalizeUTF8");
const { ejecutarConsulta } = require("../../PoolConsulta");

//cargarlos fallecidos de la base de datos del mes que se envie
const loadFallecidos = async (db, desde, hasta) => {
  try {
    let fallecidos = await ejecutarConsulta(
      db,
      "SELECT * FROM P_CARGARORDENES(?, ?)",
      [desde, hasta],
    );
    fallecidos = normalizeRow(fallecidos);
    return fallecidos;
  } catch (error) {
    throw error;
  }
};

module.exports = { loadFallecidos };

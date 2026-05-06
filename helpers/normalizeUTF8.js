// nornalizamos lo de charset WIN1252 a UTF-8 para evitar problemas con caracteres acentuados
const crypto = require("crypto");

// Función para normalizar los datos de la base de datos a UTF-8
function normalizeRow(row) {
  const normalize = (obj) => {
    const fixed = {};

    for (const key in obj) {
      const value = obj[key];

      fixed[key] =
        typeof value === "string"
          ? Buffer.from(value, "binary").toString("utf8")
          : value;
    }

    return fixed;
  };

  // 🔥 si es array
  if (Array.isArray(row)) {
    return row.map(normalize);
  }

  // 🔥 si es objeto
  return normalize(row);
}

// Función paara hashear contraseñas
function hashPassword(password) {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex")
    .toUpperCase();
}

module.exports = { normalizeRow, hashPassword };

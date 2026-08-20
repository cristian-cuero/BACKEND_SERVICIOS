function construirWhere(datos = [], sql = "") {


  let condiciones = [];
  let valores = [];

  for (const [key, value] of Object.entries(datos)) {
    if (value !== undefined && value !== null) {
      condiciones.push(`${key} = ?`);
      valores.push(value);
    }
  }

  if (condiciones.length > 0) {
    sql += ` WHERE ${condiciones.join(" AND ")}`;
  }

  return [sql, valores];
}

module.exports = {
  construirWhere,
};



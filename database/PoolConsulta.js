const { getPool } = require("./FirebirdPoolFactory");

async function ejecutarConsulta(dbKey, sql, params = []) {


const pool = await getPool(dbKey);

  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);

      db.query(sql, params, (err, result) => {
        db.detach(); // 🔥 devuelve al pool

        if (err) {
          if (err.gdscode === 335544665) {
            return reject({
              msg: "Ya se encuentra el registro",
              codigo: 0,
            });
          }
          return reject(err);
        }

        resolve(result);
      });
    });
  });
}

module.exports = { ejecutarConsulta };
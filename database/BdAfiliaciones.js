const pool = require("./config");

const DB_CATALOG = new Map();
let lastLoad = 0;
const TTL = 1000 * 60 * 5;

async function loadDbCatalog(force = false) {
  const now = Date.now();

  if (!force && now - lastLoad < TTL) {
    return DB_CATALOG;
  }

  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) return reject(err);

      const sql = `
        SELECT ID, IP, PUERTO, BD, SUBDOMINIO
        FROM TBLBDAFILIACIONESWEB
      `;

      db.query(sql, (err, rows) => {
        db.detach();
        if (err) return reject(err);

        DB_CATALOG.clear();

        rows.forEach((r) => {
          DB_CATALOG.set(r.subdominio, {
            host: r.ip,
            port: Number(r.puerto),
            user: "SYSDBA",
            password: "masterkey",
            database: r.bd.replace(/\\\\/g, "\\"),
            charset: "WIN1252",
            lowercase_keys: true,
          });
        });

        lastLoad = now;

        resolve(DB_CATALOG);
      });
    });
  });
}

module.exports = { DB_CATALOG, loadDbCatalog };

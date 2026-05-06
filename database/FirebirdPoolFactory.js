const Firebird = require("node-firebird");
const { DB_CATALOG, loadDbCatalog } = require("./BdAfiliaciones");

const pools = new Map();
const lastUsed = new Map();
const creatingPools = new Map();
const MAX_POOL_SIZE = 5;
const IDLE_TIMEOUT = 1000 * 60 * 10; // 10 min

//creacion de un pool de conexiones para cada BD registrada en el catalogo
function createPool(cfg) {
  return Firebird.pool(MAX_POOL_SIZE, {
    ...cfg,
    user: "SYSDBA",
    password: "masterkey",
    charset: "WIN1252",
    lowercase_keys: true,
  });
}

// busca el pool de conexiones para la BD dada, si no existe lo crea
async function getPool(dbKey) {
  console.log('dbkey :>> ', dbKey);
  let cfg = DB_CATALOG.get(dbKey);

  if (!cfg) {
    await loadDbCatalog(true);
    cfg = DB_CATALOG.get(dbKey);
  }
  if (!cfg) throw new Error("BD no registrada: " + dbKey);

  // evitar crear multipools si llegan varias solicitudes simultáneas para la misma BD
  if (creatingPools.has(dbKey)) {
    await creatingPools.get(dbKey);
    return pools.get(dbKey);
  }

  if (!pools.has(dbKey)) {
    const creating = (async () => {
      console.log(`🆕 Creando pool para: ${dbKey}`);
      const pool = createPool(cfg);
      pools.set(dbKey, pool);
    })();

    creatingPools.set(dbKey, creating);
    await creating;
    creatingPools.delete(dbKey);
  }

  lastUsed.set(dbKey, Date.now());

  return pools.get(dbKey);
}

setInterval(() => {
  const now = Date.now();

  for (const [key, pool] of pools.entries()) {
    const last = lastUsed.get(key) || 0;

    if (now - last > IDLE_TIMEOUT) {
      console.log(
        `🧹 Cerrando pool inactivo: ${key} (inactivo ${Math.round((now - last) / 1000)}s)`,
      );

      try {
        if (pool && typeof pool.destroy === "function") {
          pool.destroy();
        }
      } catch (err) {
        console.error("Error cerrando pool:", err);
      }
      pools.delete(key);
      lastUsed.delete(key);
    }
  }
}, 60000); // revisa cada minuto

module.exports = { getPool };

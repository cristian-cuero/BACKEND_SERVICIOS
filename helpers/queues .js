const queues = new Map();

function enqueue(dbKey, task) {
  if (!queues.has(dbKey)) {
    queues.set(dbKey, Promise.resolve());
  }

  const queue = queues.get(dbKey);

  const next = queue
    .then(() => task())
    .catch(err => {
      console.error("Error en cola:", err);
      throw err;
    });

  queues.set(dbKey, next);

  return next;
}

module.exports = { enqueue };

//ejemplo

// const { enqueue } = require('../utils/queue');

// async function crearFactura(dbKey, data) {
//   return enqueue(dbKey, async () => {
//     const pool = await getPool(dbKey);
//     const db = await getConnection(pool);

//     try {
//       await repo.insertFactura(db, data);
//       await repo.actualizarSaldo(db, data);
//     } finally {
//       db.detach();
//     }
//   });
// }
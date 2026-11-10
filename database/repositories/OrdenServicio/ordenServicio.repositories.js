const { getPool } = require("../../FirebirdPoolFactory");
const Firebird = require("node-firebird");
const { procesos } = require("../../../helpers/procesos");

// Mapeo JSON (Estilo VB6) -> Columna Firebird
// IMPORTANTE: Asegúrate que los nombres de columnas a la derecha sean exactos en Firebird.
const MAPA_CAMPOS = {
  "txtsNoContrato": "IDSCONTRATO",
  "txtCedulaAfil": "CEDULAAFIL",
  "CmbCategoria": "IDCATEGORIA",
  "CmbTipoServicio": "IDTIPOSERVICIO",
  "ComboDestinoF": "DESTINOFINAL",
  "CmbCementerio": "IDCEMENTERIO",
  "cmbsLugarVelacion": "VELACION",
  "fechaServicio": "SFECHA",
  "fechaVelacion": "FECHAVELACION",
  "horaReporte": "HORAREPORTE",
  "horaInicioVelacion": "HORAVELACION",
  "txtMailAfil": "MAILAFIL",
  "CmbSede": "IDSEDE",
  "CmbSede2": "IDSEDE2",
  "OptMarcaPaso": "MARCAPASO",
  "OptCovid": "COVID",
  "CheckFiador": "IDFIADOR"
  // Aquí iremos agregando todos los demás campos según el código VB6
};

const insertarOrdenServicio = async (subdominio, datosOrden, pwd1) => {
  const pool = await getPool(subdominio);

  return new Promise((resolve, reject) => {
    pool.get((err, dbConn) => {
      if (err) return reject(err);

      dbConn.transaction(Firebird.ISOLATION_READ_COMMITTED, async (err, transaction) => {
        if (err) {
          dbConn.detach();
          return reject(err);
        }

        try {
          const columnas = [];
          const placeholders = [];
          const valores = [];

          // Construcción dinámica basada en el mapa
          for (const [key, val] of Object.entries(datosOrden)) {
            if (MAPA_CAMPOS[key]) {
              columnas.push(MAPA_CAMPOS[key]);
              placeholders.push('?');
              valores.push(val);
            }
          }

          if (columnas.length === 0) {
            throw new Error("No se encontraron campos válidos para insertar.");
          }

          const sql = `INSERT INTO TBLFALLECIDO (${columnas.join(', ')}) VALUES (${placeholders.join(', ')})`;

          await queryAsync(transaction, sql, valores);

          // Bitácora (usando el helper que creamos)
          await procesos(
            "Se creo un Nueva Orden de Servicio",
            "Orden de Servicio",
            "Orden No " + (datosOrden.txtsNoContrato || "N/A"),
            "Fallecido: " + (datosOrden.txtsFallecido || "N/A"),
            pwd1
          );

          transaction.commit((err) => {
            dbConn.detach();
            if (err) return reject(err);
            resolve({ idContrato: datosOrden.txtsNoContrato, status: "OK" });
          });

        } catch (error) {
          transaction.rollback(() => {
            dbConn.detach();
            reject(error);
          });
        }
      });
    });
  });
};

function queryAsync(transaction, sql, params = []) {
  return new Promise((resolve, reject) => {
    transaction.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = { insertarOrdenServicio, queryAsync };

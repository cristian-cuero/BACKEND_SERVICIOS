const { db } = require('../../config'); // Ajusta según la ruta real de tu config

const registrarBitacora = async (accion, proceso, descripcion1, descripcion2) => {
    // Nota: Se asume que IDBITACORA es autoincremental en Firebird (trigger/generator).
    const query = `
        INSERT INTO TBLPROCESOS (ACCION, PROCESO, FECHA, DESCRIPCION1, DESCRIPCION2)
        VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?)
    `;

    try {
        // Asumiendo que tu conexión db tiene un método .query o .execute
        await db.query(query, [accion, proceso, descripcion1, descripcion2]);
        return true;
    } catch (error) {
        console.error('Error al registrar bitácora en BD:', error);
        throw error;
    }
};

module.exports = { registrarBitacora };

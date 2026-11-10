const { registrarBitacora } = require('../database/repositories/Bitacora/bitacora.repositories');

/**
 * Helper para registrar procesos en la bitácora.
 * @param {string} accion
 * @param {string} proceso
 * @param {string} descripcion1
 * @param {string} descripcion2
 * @param {string} pwd1 - El valor de PWD1 para la validación
 */
const procesos = async (accion, proceso, descripcion1, descripcion2, pwd1) => {
    // Validamos la lógica original de VB6: PWD1 <> "consulta"
    if (pwd1 !== "consulta") {
        await registrarBitacora(accion, proceso, descripcion1, descripcion2);
    }
};

module.exports = { procesos };

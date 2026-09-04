const { ejecutarConsulta } = require("../../PoolConsulta");




async function  getIdentificacionSQL  (db ) {

    const query = "SELECT * FROM TBLTIPOIDENTIFICACION WHERE MOSTRAR = 0 ORDER BY IDENTIFICACION";

    return await ejecutarConsulta(db, query , [])
    
}


module.exports = {
    getIdentificacionSQL
}
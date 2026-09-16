

// Manejanos Convenios

const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");


async function getConvenios(db  , parametros) {

    let query = `SELECT * FROM TBLCONEVIOS `;

    let [sqlWhere, valores] = construirWhere(parametros, query);

    sqlWhere += " ORDER BY CONVENIO ASC";

  
    return await ejecutarConsulta(db, sqlWhere, valores);
}


// ----------------------------------PARTE DE  ESTADO DE SERVICIOS

async function getEstadoServicio(db  , parametros) {
    
    let query = `SELECT * FROM TBLESTADOSSERVICIO `;   

    let [sqlWhere, valores] = construirWhere(parametros, query);

    sqlWhere += " ORDER BY NOMBRE ASC";

    return await ejecutarConsulta(db, sqlWhere, valores);
}

module.exports = {  
    getConvenios,
    getEstadoServicio
}   

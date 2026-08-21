const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");

async function getEstadoServiciosSQL(db , parametros) {

     const query = "SELECT * FROM TBLESTADOSERVICIO "
     let [sqlWhere, valores] = construirWhere(parametros , query)

     sqlWhere += " ORDER BY ESTADO "

     return await ejecutarConsulta(db, sqlWhere , valores)
    
}


module.exports={
     getEstadoServiciosSQL
}
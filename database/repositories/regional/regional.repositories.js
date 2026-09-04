const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");



async function getDepartamentoSQL(db , parametro) {

    const query = "select * from tblDEPARTAMENTOS"

     let [sqlWhere, valores] = construirWhere(parametro, query);

     sqlWhere += " ORDER BY DEPARTAMENTO"

     return await ejecutarConsulta(db, sqlWhere , valores)
    
}

async function getCiudadSQL(db , parametro) {

    const query =  "select * from TBLMUNICIPIOS" ;

     let [sqlWhere, valores] = construirWhere(parametro, query);

     sqlWhere += " order by MUNICIPIO"

     console.log('sqlWhere :>> ', sqlWhere);
    
     return await ejecutarConsulta(db ,sqlWhere ,valores);
}


module.exports = {
    getDepartamentoSQL,
    getCiudadSQL
}
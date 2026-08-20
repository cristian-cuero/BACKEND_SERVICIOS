const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");


const getSedesSql = async (db, parametros ) => {

    let query = `select * from tblsedes s`;

     let [sqlWhere, valores] = construirWhere(parametros, query);

     sqlWhere += " order by s.sede";

     console.log('sqlWhere :>> ', sqlWhere);
    return await ejecutarConsulta(db, sqlWhere, valores);
}

module.exports = {  
getSedesSql
}
const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");


async function getBancosSql(db, parametros) {

    const query = "SELECT * FROM TBLBANCOS "

     let [sqlWhere, valores] = construirWhere(parametros, query);

     sqlWhere += "  ORDER BY BANCO"

     return await ejecutarConsulta(db, sqlWhere , valores)

    
}

module.exports = {
    getBancosSql
}
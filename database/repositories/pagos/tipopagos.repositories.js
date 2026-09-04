const { construirWhere } = require("../../DbWhere");
const { ejecutarConsulta } = require("../../PoolConsulta");




const getTipoPagosSQL = async (db , parametros)=> {

    const query = "SELECT * FROM TBLTIPOPAGO "

     let [sqlWhere, valores] = construirWhere(parametros, query);

     console.log('valores :>> ', valores);
     if(valores.length === 0){
        valores= [1]

        sqlWhere += " WHERE ESTADO = ?"

     }

     sqlWhere += " ORDER BY TIPOPAGO"

     return await ejecutarConsulta(db, sqlWhere , valores)

}

module.exports ={

    getTipoPagosSQL
}
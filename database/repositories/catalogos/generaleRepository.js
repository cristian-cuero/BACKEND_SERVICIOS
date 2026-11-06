

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

// ----------------------------------NUEVOS CATÁLOGOS

async function getCategorias(db, parametros) {
    let query = `SELECT * FROM TBLCATEGORIAS `;
    let [sqlWhere, valores] = construirWhere(parametros, query);
    sqlWhere += " ORDER BY CATEGORIA ASC";
    return await ejecutarConsulta(db, sqlWhere, valores);
}

async function getTipoServicio(db, parametros) {
    let query = `SELECT * FROM TBLTIPOSERVICIO `;
    let [sqlWhere, valores] = construirWhere(parametros, query);
    sqlWhere += " ORDER BY DESCRIPCION ASC";
    return await ejecutarConsulta(db, sqlWhere, valores);
}

async function getDepartamentos(db, parametros) {
    let query = `SELECT * FROM TBLDEPARTAMENTOS `;
    let [sqlWhere, valores] = construirWhere(parametros, query);
    sqlWhere += " ORDER BY DEPARTAMENTO ASC";
    return await ejecutarConsulta(db, sqlWhere, valores);
}

async function getAuxilios(db, parametros) {
    let query = `SELECT * FROM TBLAUXILIOSF `;
    let [sqlWhere, valores] = construirWhere(parametros, query);
    sqlWhere += " ORDER BY AUXILIO ASC";
    return await ejecutarConsulta(db, sqlWhere, valores);
}

async function getCategoriasGrupo(db, parametros) {
    let query = `SELECT * FROM TBLCATEGORIASGRUPO `;
    let [sqlWhere, valores] = construirWhere(parametros, query);
    sqlWhere += " ORDER BY nombre ASC";
    return await ejecutarConsulta(db, sqlWhere, valores);
}

module.exports = {
    getConvenios,
    getEstadoServicio,
    getCategorias,
    getTipoServicio,
    getDepartamentos,
    getAuxilios,
    getCategoriasGrupo
}

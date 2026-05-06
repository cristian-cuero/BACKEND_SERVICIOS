const { ejecutarConsulta } = require("../PoolConsulta");


async function userLogin(data) {

  
    const user = await ejecutarConsulta (data.subdominio, "SELECT * FROM P_LOGINUSUARIO(?)", [data.username]);

    return user;
}


module.exports = {
    userLogin
}
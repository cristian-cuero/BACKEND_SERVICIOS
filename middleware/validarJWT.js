const jwt = require("jsonwebtoken");
const { userLogin } = require("../database/repositories/user.repositories");


const validarJWT = async (request, reply) => {

  const token = request.headers["x-token"];

  // 🔐 validar token
  if (!token) {
    return reply.code(401).send({
      msg: "No hay token en la petición"
    });
  }

  try {

    // verificar JWT
    const { username,subdominio  } = jwt.verify(
      token,
      process.env.SECRETORPRIVATEKEY
    );



    // validar BD
    if (!subdominio) {
      return reply.code(400).send({
        msg: "Token sin BD asociada"
      });
    }

    // buscar usuario
    const usuario = await userLogin({ username: username.user, subdominio });

    if (!usuario) {
      return reply.code(401).send({
        msg: "Token no válido - usuario no existe DB"
      });
    }

    // validar estado
    if (usuario[0].ESTADO === 1) {
      return reply.code(401).send({
        msg: "Token no válido - usuario inactivo"
      });
    }


    // guardar datos en request
    request.tenant = {
    subdominio,
    username
    };

  } catch (error) {

    console.log(error);

    return reply.code(401).send({
      msg: "Token no válido"
    });

  }

};

module.exports = {
  validarJWT
};
const { generarJWT } = require("../helpers/generarWJT");
const { loginUser } = require("../services/user.services");

async function login(req, reply) {
  
  try {
    const data = req.body;
    const user = await loginUser(data);
    const token = await generarJWT(user.username , data.subdominio);
    reply.send({user, token});
  }catch (error) {
    reply.status(400).send({ error: error.message });
  }
  
}


module.exports = {
  login
};
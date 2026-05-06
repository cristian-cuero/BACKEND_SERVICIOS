const fields = require("./fields/flieds");

const loginSchema = {
  body: {
    type: "object",
    required: ["username", "password", "subdominio"],
    properties: {
      username: fields.username,
      password: fields.password,
      subdominio: fields.subdominio
    },
    errorMessage: {
      required: {
        username: "Falta usuario",
        password: "Falta contraseña",
        subdominio: "Falta subdominio"
      }
    }
  }
};

module.exports = {
  loginSchema
};
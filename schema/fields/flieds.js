const fields = {
  username: {
    type: "string",
    minLength: 1,
    errorMessage: {
      minLength: "El usuario no puede estar vacío"
    }
  },
  password: {
    type: "string",
    minLength: 1,
    errorMessage: {
      minLength: "La contraseña no puede estar vacía"
    }
  },
  subdominio: {
    type: "string",
    minLength: 1,
    errorMessage: {
      minLength: "El subdominio no puede estar vacío"
    }
  }
};

module.exports = fields;
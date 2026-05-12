const servicesFields = {
    desde: {
    type: "date",
    errorMessage: {
      minLength: "ingrese una fecha de inicio"
    }
  },
    hasta: { 
        type: "date",
        errorMessage: {
            minLength: "ingrese una fecha de fin"
        }   
    }
};

module.exports = servicesFields;
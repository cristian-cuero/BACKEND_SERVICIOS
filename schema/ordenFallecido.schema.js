const ordenFallecidoSchema = {
  body: {
    type: 'object',
    required: [
      'txtsIdentificacion',
      'txtCedulaAfil',
      'ComboDestinoF',
      'CmbCementerio'
    ],
    properties: {
      txtsIdentificacion: { type: 'string', minLength: 1 },
      txtCedulaAfil: { type: 'string', minLength: 1 },
      ComboDestinoF: { type: 'string', minLength: 1 },
      CmbCementerio: { type: 'string', minLength: 1 },

      // Campos condicionales/opcionales que VB6 valida en lógica
      CmbCategoria: { type: 'string' },
      CmbRaza: { type: 'string' },
      CmbEspecie: { type: 'array', items: { type: 'string' } },

      txtMailAfil: { type: 'string', format: 'email' },

      // Campos para Nuevo servicio
      CmbSede: { type: 'string' },
      CmbSede2: { type: 'string' },
      txtsNoContrato: { type: 'string' },
      TextNitCedula: { type: 'string' },
      TextNombrePresta: { type: 'string' },
      CmbCoordinaPor: { type: 'string' },
      CmbServicioPor: { type: 'string' },
      CmbSAlatAtendida: { type: 'string' },
      CmbSoat: { type: 'string' },

      // Flags de estado
      SNuevo: { type: 'boolean' },
      SEditar: { type: 'boolean' },

      // Fechas
      DTPFechaVelacion: { type: 'string', format: 'date' },
      DiaSepelio: { type: 'string', format: 'date' },
      CombosFecha: { type: 'string', format: 'date' },

      // Otras entidades
      CheckFiador: { type: 'integer' },
      txtIDFiador: { type: 'string' }
    }
  }
};

module.exports = { ordenFallecidoSchema };

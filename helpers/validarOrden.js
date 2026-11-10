/**
 * Helper para validar las reglas de negocio de la Orden de Servicio / Fallecido.
 * Migrado desde la lógica original de VB6.0.
 */

/**
 * Valida campos comunes requeridos siempre.
 */
function validarComunes(datos, errores) {
  if (!datos.txtsIdentificacion || datos.txtsIdentificacion.trim() === "") errores.push("La Identificación del Fallecido es Obligatoria");
  if (!datos.txtCedulaAfil || datos.txtCedulaAfil.trim() === "") errores.push("La Identificación del Contratante es Obligatoria");
  if (!datos.ComboDestinoF || datos.ComboDestinoF.trim() === "") errores.push("Debe Seleccionar el Destino Final");
  if (!datos.CmbCementerio || datos.CmbCementerio.trim() === "") errores.push("Debe Seleccionar el Cementerio");
}

/**
 * Valida lógica condicional para Mascotas.
 */
function validarMascotas(datos, errores) {
  if (datos.CmbCategoria === "Mascotas") {
    const raza = datos.CmbRaza;
    const especie = Array.isArray(datos.CmbEspecie) ? datos.CmbEspecie[0] : datos.CmbEspecie;
    if (!raza || raza === "" || !especie || especie === "") {
      errores.push("Seleccione La Raza y Especie para Mascotas");
    }
  }
}

/**
 * Valida formato de email.
 */
function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida fechas (integridad temporal).
 * Convierte strings "yyyy-MM-dd" y "HH:mm" a objetos Date comparables.
 */
function validarFechas(datos, errores) {
  try {
    const fechaVelacion = datos.DTPFechaVelacion ? new Date(datos.DTPFechaVelacion) : null;
    const fechaSepelio = datos.DiaSepelio ? new Date(datos.DiaSepelio) : null;
    const fechaServicio = datos.CombosFecha ? new Date(datos.CombosFecha) : null;

    const horaReporte = datos.DTPHoraReporte ? new Date(`1970-01-01T${datos.DTPHoraReporte}`) : null;
    const horaVelacion = datos.DTPHoraVelacion ? new Date(`1970-01-01T${datos.DTPHoraVelacion}`) : null;
    const horaSepelio = datos.DtpsHoraSepelio ? new Date(`1970-01-01T${datos.DtpsHoraSepelio}`) : null;

    // 1. La fecha de velación no puede ser menor que la fecha de servicio
    if (fechaVelacion && fechaServicio && fechaVelacion < fechaServicio) {
      errores.push("La Fecha De Velación No Puede Ser Menor Que La Fecha De Servicio");
    }

    // 2. La fecha de velación no puede ser superior a la fecha de las exequias (sepelio)
    if (fechaVelacion && fechaSepelio && fechaVelacion > fechaSepelio) {
      errores.push("La Fecha De Velación No Puede Ser Superior A La Fecha De Las Exequias");
    }

    // 3. La hora de inicio de velación no puede ser inferior a la hora del reporte del servicio
    // Solo si es el mismo día
    if (horaVelacion && horaReporte && fechaVelacion && fechaServicio &&
        fechaVelacion.getTime() === fechaServicio.getTime() && horaVelacion < horaReporte) {
      errores.push("La Hora De Inicio De Velación No Puede Ser Inferior A La Hora Del Reporte Del Servicio");
    }

    // 4. La hora de inicio de velación no puede ser superior a la hora de sepelio
    // Solo si es el mismo día
    if (horaVelacion && horaSepelio && fechaVelacion && fechaSepelio &&
        fechaVelacion.getTime() === fechaSepelio.getTime() && horaVelacion > horaSepelio) {
      errores.push("La Hora De Inicio De Velación No Puede Ser Superior A La Hora De Sepelio");
    }

  } catch (e) {
    // Si hay error parseando fechas, no bloqueamos por esto, solo loggeamos internamente si hace falta
    console.warn("Error validando fechas:", e.message);
  }
}

/**
 * Función principal de validación.
 * @param {Object} datos - Objeto con los datos del request (req.body).
 * @param {boolean} esNuevo - True si es creación (SNuevo), False si es edición (SEditar).
 * @returns {string[]} - Array de mensajes de error. Vacío si todo está bien.
 */
function validarOrden(datos, esNuevo) {
  const errores = [];

  // 1. Validaciones Comunes
  validarComunes(datos, errores);

  // 2. Lógica Condicional (Mascotas)
  validarMascotas(datos, errores);

  // 3. Validaciones específicas según estado
  if (esNuevo) {
    // MarcaPaso (OptMarcaPaso[0]=No, OptMarcaPaso[1]=Si, asumimos array o radio buttons)
    const marcaPaso = Array.isArray(datos.OptMarcaPaso) ? datos.OptMarcaPaso[0] !== false || datos.OptMarcaPaso[1] !== false : datos.OptMarcaPaso;
    if (marcaPaso === undefined || marcaPaso === "") {
      errores.push("Debes Indicar Si Tiene MarcaPaso Si o No");
    }

    // Covid
    const covid = Array.isArray(datos.OptCovid) ? datos.OptCovid[0] !== false || datos.OptCovid[1] !== false : datos.OptCovid;
    if (covid === undefined || covid === "") {
      errores.push("Debes Indicar Características Covid-19");
    }

    // Otros campos requeridos para nuevo
    if (!datos.cmbsLugarVelacion) errores.push("Debe Asignar la Respectiva Sala de Velación");
    if (!datos.CmbCategoria) errores.push("Debe Seleccionar la Categoria del Servicio");
    if (!datos.CmbTipoServicio) errores.push("Debe Seleccionar el Tipo de Servicio");

    // Email
    if (!datos.txtMailAfil || !validarEmail(datos.txtMailAfil)) {
      errores.push("La Dirección de Correo del Contratante no es Válida");
    }

    // Lista exhaustiva de campos (simplificada, añade los que falten según tu formulario real)
    const camposObligatoriosNuevo = [
      'CmbSede', 'CmbSede2', 'txtsNoContrato', 'TextNitCedula',
      'TextNombrePresta', 'CmbCoordinaPor', 'CmbServicioPor',
      'CmbSAlatAtendida', 'CmbSoat'
    ];

    camposObligatoriosNuevo.forEach(campo => {
      if (!datos[campo] || datos[campo] === "") {
        errores.push(`Campo requerido faltante: ${campo}`);
      }
    });

    // Validación de Fechas (Integridad Temporal)
    validarFechas(datos, errores);

  } else {
    // Validaciones mínimas Edición (SEditar)
    const camposObligatoriosEdicion = [
      'txtsNoContrato', 'CmbCoordinaPor', 'CmbServicioPor', 'CmbSoat'
    ];

    camposObligatoriosEdicion.forEach(campo => {
      if (!datos[campo] || datos[campo] === "") {
        errores.push(`Campo requerido para edición faltante: ${campo}`);
      }
    });
  }

  // 4. Fiador
  if (datos.CheckFiador === 1 || datos.CheckFiador === true) {
    if (!datos.txtIDFiador || datos.txtIDFiador === "") {
      errores.push("Ingrese Todos Los Campos Requeridos del Fiador");
    }
  }

  return errores;
}

module.exports = { validarOrden };
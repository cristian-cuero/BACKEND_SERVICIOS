// helpers/preprocesarOrden.js

/**
 * Preprocesa los datos de la orden para inserción en TBLFALLECIDO.
 * Mapea los campos del objeto de entrada a las columnas de la BD (Firebird)
 * aplicando las transformaciones necesarias.
 *
 * NOTA: Los IDs (Asesores, TipoServicio, Cofre, etc.) deben venir
 * ya resueltos desde el frontend/request.
 */
const preprocesarOrden = (datos) => {
  const resultado = {
    // Identificación y básicos
    IDSCONTRATO: datos.idContrato,
    CONTRATISTA: datos.contratista,
    CEDULAAFIL: datos.cedulaAfil,
    NITEMPRESAAFIL: datos.nitEmpresaAfil,
    EMPRESAAFIL: datos.empresaAfil,
    TELEFONOAFIL: datos.telefonoAfil,
    AFILIACION: datos.fechaAfiliacion ? new Date(datos.fechaAfiliacion).toISOString().split('T')[0] : null,
    PARENTESCO: datos.idParentesco,

    // Destino y detalles
    DESTINOFINAL: datos.destinoFinal,
    MOTIVOMUERTE: datos.motivoMuerte,
    ESTADO: datos.estado,
    VALRETORNO: Number(datos.valorRetorno) || 0,
    GRADO: datos.grado,
    AUTORIZADOPOR: datos.autorizadoPor,
    EXTAUTORIZADOPOR: datos.extensionAutoriza,
    HORAAUTORIZADOPOR: datos.horaAutoriza,
    BONIFICA: datos.bonifica,
    REPORTADOPOR: datos.reportadoPor,
    INVITAN: datos.invitan,
    CIUDADCEMENTERIO: datos.ciudadCementerio ? datos.ciudadCementerio.toUpperCase() : null,

    // IDs de entidades (Ya resueltos desde el frontend)
    IDSALA1: datos.idSala,
    IDCARROZA: datos.idCarroza,
    IDCEMENTERIO: datos.idCementerio,
    IDIGLESIA: datos.idIglesia,
    IGLESIA: datos.nombreIglesia,

    // Fechas y Ubicaciones
    DEPARTAMENTOFALLECIDO: datos.departamentoFallecido,
    CIUDADFALLECIDO: datos.ciudadFallecido,
    LUGAREXPEDICIONCED: datos.lugarExpedicionCed,
    HORAREPORTE: datos.horaReporte,
    HORAVELACION: datos.horaVelacion,
    FECHAVELACION: datos.fechaVelacion ? new Date(datos.fechaVelacion).toISOString().split('T')[0] : null,

    // Flags (Booleans -> 0/1)
    SINCOFRE: datos.sinCofre ? 1 : 0,
    SINURNA: datos.sinUrna ? 1 : 0,
    SINTRIANGULO: datos.sinTriangulo ? 1 : 0,
    RAMOCORTESIA: datos.ramoCortesia ? 1 : 0,
    IDENTIFICACIONPROVEEDOR: datos.idProveedorFlores || 0,
    IDFIADOR: datos.checkFiador ? (datos.idFiador + "F") : "-1",

    // Datos Fallecido
    SFECHA: datos.fechaServicio ? new Date(datos.fechaServicio).toISOString().split('T')[0] : null,
    IDFALLECIDO: datos.idFallecido,
    NOMBRE: datos.nombreFallecido ? datos.nombreFallecido.trim().toUpperCase() : null,
    APELLIDOS: datos.apellidosFallecido ? datos.apellidosFallecido.trim().toUpperCase() : null,
    ESTADO_CIVIL: datos.estadoCivil,
    CONYUGE: datos.conyuge,
    MADRE: datos.madre,
    PADRE: datos.padre,
    OCUPACION: datos.ocupacion,
    DIRECCION: datos.direccion,
    TELEFONO: datos.telefono,
    VELACION: datos.lugarVelacion,
    LUGAR_MUERTE: datos.lugarMuerte,
    HORA_MUERTE: datos.horaMuerte,
    DIASEPELIO: datos.diaSepelio ? new Date(datos.diaSepelio).toISOString().split('T')[0] : null,
    LUGAR_NACIMIENTO: datos.lugarNacimiento,
    TIEMPO_PERMANENCIA: datos.tiempoPermanencia,
    MEDICO: datos.medico,
    HORA_SEPELIO: datos.horaSepelio,
    SEXO: datos.sexo ? datos.sexo.substring(0, 1) : null,
    NOHIJOS: datos.noHijos || 0,
    FECHANACIMIENTO: datos.fechaNacimiento,
    FECHANACIMIENTOT: datos.fechaNacimientoT,
    DIRECCIONAFIL: datos.direccionAfil,
    FECHAMUERTE: datos.fechaMuerte,
    CAUSAMUERTE: datos.causaMuerte,
    DIRVELACION: datos.dirVelacion,
    TIPO: datos.tipoAfiliado, // AfiliadoCD, Particular, etc.

    // Documentos y Registros
    FECHADIGITAREGISTRO: datos.fechaDigitacion,
    REGISTRO: datos.registro,
    NOTARIA: datos.notaria,
    NROCERTIFICADO: datos.nroCertificado,
    LIC_INHUMACION: datos.licInhumacion,
    FECHAREGISTRO: datos.fechaRegistro,

    // Suministrados
    IDSUMINISTRADO: datos.idSuministrado,
    NOMSUMINISTRADO: datos.nomSuministrado,
    DIRSUMINISTRADO: datos.dirSuministrado,
    TELSUMINISTRADO: datos.telSuministrado,
    EMPSUMINISTRADO: datos.empSuministrado,
    TELEMPSUMINISTRADO: datos.telEmpSuministrado,

    // Detalles adicionales
    PRESERVACION: datos.preservacion,
    OBSERVACIONES: datos.observaciones,
    ANULADA: datos.anulada ? 1 : 0,
    MARCAPASO: datos.marcaPaso ? "1" : "0",
    COVID: datos.covid ? "1" : "0",
    LLEGADASERVICIO: datos.llegadaServicio,
    LLEGADASERVICIOOTRO: datos.llegadaServicioOtro,
    CARTACONFORMIDAD: datos.cartaConformidad ? 1 : 0,
    MAILAFIL: datos.mailAfil,
    OBSERVACIONES2: datos.observaciones2,
    PAZYSALVO: datos.pazYSalvo || null,
    FECHAEXPEDICION: datos.fechaExpedicion ? new Date(datos.fechaExpedicion).toISOString().split('T')[0] : null,
    SOAT: datos.soat, // Asumimos que viene resuelto (Si, No, MD, etc.)
    IDENTIDAD: datos.idFondo || null,
    SERVICIOCOORSERPARK: datos.nroSC ? datos.nroSC.toUpperCase() : null,
    IDCATEGORIA: datos.idCategoria || null,
    IDTIPOSERVICIO: datos.idTipoServicio,
    TIPOPLAN: datos.tipoPlan ? datos.tipoPlan.toUpperCase() : null,
    IDCOFRE: datos.idCofre || null,
    IDPLAN: datos.idPlan || null,
    CONTADO: datos.contado || 0,
    ABONO: datos.abono || 0,

    // Asesores (IDs ya resueltos)
    SERVICIOPOR: datos.idAsesorServicioPor,
    IDASESORCOORDINA: datos.idAsesorCoordinaPor,
    IDTRASLADOSEPELIO: datos.idTrasladoSepelio,
    IDSALAATENDIDAPOR: datos.idSalaAtendidaPor,
    IDASESORAPOYO: datos.idAsesorApoyo,
    USUARIOMODIF: datos.usuarioModif,

    // Campos condicionales Mascotas
    IDRAZA: datos.idRaza || null,
    PESO: datos.peso || 0,
    TAMANO: datos.tamano,
    COLOR: datos.color,
    TALLA: datos.talla
  };

  // Filtrar campos nulos/indefinidos para evitar errores en el insert
  Object.keys(resultado).forEach(key => (resultado[key] == null) && delete resultado[key]);

  return resultado;
};

module.exports = { preprocesarOrden };

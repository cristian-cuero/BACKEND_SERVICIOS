---
name: validaciones-orden-servicio
description: Reglas de validación de negocio para la creación/edición de una orden de servicio.
metadata:
  type: project
---

**Lógica de Validación (Migrada de VB6.0):**
Las validaciones se dividen en:
1. **Comunes:** txtsIdentificacion, txtCedulaAfil, ComboDestinoF, CmbCementerio.
2. **Condicionales:** Si CmbCategoria == "Mascotas", requiere CmbRaza y CmbEspecie.
3. **Estado (Nuevo/Editar):**
   - **Si es Nuevo (SNuevo):** Requiere OptMarcaPaso, OptCovid, cmbsLugarVelacion, CmbCategoria, CmbTipoServicio, txtMailAfil (con validación de formato), y una lista exhaustiva de campos (CmbSede2, CmbSede, txtsNoContrato, etc.).
   - **Si es Editar (SEditar):** Requisitos mínimos: txtsNoContrato, txtsIdentificacion, CmbCoordinaPor, CmbServicioPor, CmbSoat.
4. **Fiador:** Si CheckFiador es 1, requiere txtIDFiador.

**Validaciones de Fechas (Integridad Temporal):**
- La fecha de velación no puede ser menor que la fecha de servicio.
- La fecha de velación no puede ser superior a la fecha de las exequias (sepelio).
- La hora de inicio de velación no puede ser inferior a la hora del reporte del servicio.
- La hora de inicio de velación no puede ser superior a la hora de sepelio (si es el mismo día).

**Lógica de Edición (`SEditar` = True):**
Si la validación de fechas falla, pero estamos en modo edición, se permite una actualización parcial de la tabla `TBLFALLECIDO` (`FECHADIGITAREGISTRO`, `FECHAREGISTRO`, `REGISTRO`, `NOTARIA`, `NROCERTIFICADO`, `lic_inhumacion`).

**Arquitectura de Repositorios (Actualizada):**
- `database/repositories/Fallecidos/fallecidos.repositories.js`: Solo consultas/lectura (P_CARGARORDENES, SP_CONSULTAR_FALLECIDO, SP_CONSULTAR_PRESTACION). Usado por `routes/service.js`.
- `database/repositories/OrdenServicio/ordenServicio.repositories.js`: Transacciones de escritura (INSERT/UPDATE de órdenes). Usado por `controller/ordenServicio.controller.js`.

**Acción:** Implementar un helper `helpers/validarOrden.js` para centralizar esta lógica. Incluir validaciones de fecha usando objetos Date en JS.
[[migracion-vb6-backend]]


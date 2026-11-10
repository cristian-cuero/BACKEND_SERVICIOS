---
name: migration-state-order-service
description: Estado actual de la migración del módulo de creación de órdenes de servicio (VB6 a Node.js).
metadata:
  type: project
---

**Estado de la Migración:**
- **Validaciones:** Se ha creado `helpers/validarOrden.js` con toda la lógica de negocio (reglas de fechas, condicionales, estados Nuevo/Editar) extraída del código fuente original de VB6.
- **Arquitectura:** 
  - Se han consolidado todas las rutas en `routes/service.router.js` y el controlador en `controller/services.controller.js`.
  - Se han separado los repositorios: `database/repositories/Fallecidos/` para lectura y `database/repositories/OrdenServicio/` para la lógica transaccional de escritura (`insertarOrdenServicio`).
- **Validación Estructural:** Se ha implementado `schema/ordenFallecido.schema.js` integrado en Fastify.
- **Novedades de hoy (2026-11-09):**
  - **Contrato de datos JSON:** Definido formato plano (estilo VB6) para modo `SNuevo` con IDs directos en lugar de nombres.
  - **Bitácora (PROCESOS):** Implementado repositorio `database/repositories/Bitacora/bitacora.repositories.js` y helper `helpers/procesos.js` réplica de la función VB6.
  - **Inserción Dinámica:** Refactorizado `database/repositories/OrdenServicio/ordenServicio.repositories.js` con constructor dinámico de SQL usando `MAPA_CAMPOS` (JSON -> Columna Firebird). Esto permite insertar docenas de campos sin escribir SQL manual por cada uno.

**Pendiente para mañana:**
1. **Completar `MAPA_CAMPOS`**: Agregar los 100+ campos restantes del código VB6 al objeto de mapeo en `ordenServicio.repositories.js`.
2. **Ajustar Controlador**: Conectar `controller/services.controller.js` para llamar a `insertarOrdenServicio` pasando `subdominio`, `datosOrden` y `pwd1`.
3. **Validar Nombres de Columna**: Confirmar que los nombres en `MAPA_CAMPOS` (lado derecho) coinciden exactamente con la tabla `TBLFALLECIDO` en Firebird.
4. **Campos Condicionales**: Implementar lógica para `IDFIADOR` (cuando CheckFiador=1), campos de Mascotas (`IDRAZA`, `PESO`, etc.) y resolución de IDs de asesores (`IDASESORCOORDINA`, `IDASESORREGISTRA`, etc.) que ahora vendrán directo en el JSON.

**Why:** Asegurar la integridad de datos y mantener una arquitectura modular escalable.
[[migracion-vb6-backend]]
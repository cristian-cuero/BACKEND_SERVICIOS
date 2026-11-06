---
name: migracion-vb6-backend
description: Proyecto de migración de backend desde VB6.0 a Node.js/Fastify con Firebird.
metadata:
  type: project
---

**Objetivo:** Migrar el backend de un sistema legado en VB6.0 a una API web moderna.

**Stack Técnico:**
- **Framework:** Node.js + Fastify.
- **Base de Datos:** Firebird.
- **Arquitectura:** Orientada a objetos (`models/server.js`), modular por funcionalidades, rutas centralizadas.

**Estado actual:** Los endpoints para carga de catálogos (Combos/Dropdowns) ya están implementados y funcionando.

**Cómo trabajar:**
- Mantener la estructura modular actual (`routes`, `services`, `controllers`).
- Al crear nuevas funcionalidades, seguir el patrón de registro en `Server.routes()`.
- Priorizar la consistencia con el catálogo de BD ya existente.

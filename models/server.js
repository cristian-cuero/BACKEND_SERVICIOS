// server.js (Fastify)
const Fastify = require("fastify");
const cors = require("@fastify/cors");
const { dbConnections } = require("../database/db");
const { loadDbCatalog } = require("../database/BdAfiliaciones");
const ajvErrors = require('ajv-errors');
class Server {
  constructor() {
    this.app = Fastify({
      logger: true,
      ajv: {
        customOptions: {
          allErrors: true
        },
        plugins: [ajvErrors]
      }
    });
    this.port = 8080;

    this.paths = {
      usuarios: "/api/users",
      servicios: "/api/services",
    };

    this.middleware();
    this.conectarDB();
     this.routes();
  }

  async listen() {
    try {
      await this.app.listen({ port: this.port, host: "0.0.0.0" });
      console.log(`🚀 Fastify corriendo en http://localhost:${this.port}`);
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }

  async conectarDB() {
    await dbConnections();
    await loadDbCatalog();
    console.log("✅ BD y catálogo cargados");
  }

  async middleware() {
    await this.app.register(cors, {
      origin: true,
    });

  }

    routes() {
      this.app.register(require("../routes/user.router"), {
        prefix: this.paths.usuarios,
      });
      this.app.register(require("../routes/service.router"), {
        prefix: this.paths.servicios,
      });

    }
}

module.exports = Server;

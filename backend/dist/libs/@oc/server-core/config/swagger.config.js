"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.SwaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle("Oneclick Node Boilerplate 3.0 API Documentation")
    .addBearerAuth()
    .addCookieAuth("auth")
    .setExternalDoc("Backend API Profiler", "/v1/profiler-ui")
    .setDescription("Node Boilerplate 3.0 API documentation.")
    .setVersion("1.0")
    .addGlobalParameters({ name: "language", description: "Enter language code(ex. en)", in: "header" })
    .build();
//# sourceMappingURL=swagger.config.js.map
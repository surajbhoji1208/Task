"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const audit_context_service_1 = require("../generic-service/audit-context.service");
let AuditMiddleware = class AuditMiddleware {
    constructor(jwtService, auditContextService) {
        this.jwtService = jwtService;
        this.auditContextService = auditContextService;
    }
    use(req, res, next) {
        const token = this.extractTokenFromHeader(req);
        if (token) {
            const payload = this.jwtService.verify(token);
            if (payload === null || payload === void 0 ? void 0 : payload.sub) {
                this.auditContextService.setUserId(payload.sub);
            }
        }
        next();
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) !== null && _b !== void 0 ? _b : [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.AuditMiddleware = AuditMiddleware;
exports.AuditMiddleware = AuditMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        audit_context_service_1.AuditContextService])
], AuditMiddleware);
//# sourceMappingURL=audit.middleware.js.map
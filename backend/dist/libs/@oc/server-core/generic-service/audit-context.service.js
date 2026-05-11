"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditContext = exports.AuditContextService = void 0;
const common_1 = require("@nestjs/common");
let AuditContextService = class AuditContextService {
    setUserId(userId) {
        this.userId = userId;
        AuditContext.setUserId(userId);
    }
    getUserId() {
        return this.userId;
    }
};
exports.AuditContextService = AuditContextService;
exports.AuditContextService = AuditContextService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], AuditContextService);
class AuditContext {
    static setUserId(userId) {
        this.userId = userId;
    }
    static getUserId() {
        return this.userId;
    }
    static clear() {
        this.userId = undefined;
    }
}
exports.AuditContext = AuditContext;
//# sourceMappingURL=audit-context.service.js.map
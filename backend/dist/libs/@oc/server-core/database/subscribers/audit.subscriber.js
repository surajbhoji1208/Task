"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditSubscriber = void 0;
const _core_generic_services_1 = require("../../generic-service");
const typeorm_1 = require("typeorm");
let AuditSubscriber = class AuditSubscriber {
    beforeInsert(event) {
        var _a, _b;
        if (!event.entity)
            return;
        const userId = _core_generic_services_1.AuditContext.getUserId();
        if (((_a = event.metadata.columns.find((column) => column.propertyName === "createdBy")) === null || _a === void 0 ? void 0 : _a.propertyName) === "createdBy") {
            event.entity.createdBy = userId;
        }
        if (((_b = event.metadata.columns.find((column) => column.propertyName === "updatedBy")) === null || _b === void 0 ? void 0 : _b.propertyName) === "updatedBy") {
            event.entity.updatedBy = userId;
        }
    }
    beforeUpdate(event) {
        var _a;
        if (!event.entity)
            return;
        const userId = _core_generic_services_1.AuditContext.getUserId();
        if (((_a = event.metadata.columns.find((column) => column.propertyName === "updatedBy")) === null || _a === void 0 ? void 0 : _a.propertyName) === "updatedBy") {
            event.entity.updatedBy = userId;
        }
    }
    afterSoftRemove(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!event.entity)
                return;
            const userId = _core_generic_services_1.AuditContext.getUserId();
            if (((_a = event.metadata.columns.find((column) => column.propertyName === "deletedBy")) === null || _a === void 0 ? void 0 : _a.propertyName) === "deletedBy") {
                yield event.manager
                    .getRepository(event.metadata.target)
                    .update({ id: event.entity.id }, { deletedBy: userId });
            }
        });
    }
};
exports.AuditSubscriber = AuditSubscriber;
exports.AuditSubscriber = AuditSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], AuditSubscriber);
//# sourceMappingURL=audit.subscriber.js.map
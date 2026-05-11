"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const _business_core_modules_1 = require("../../../libs/@oc/business-core/modules");
const _core_database_1 = require("../../../libs/@oc/server-core/database");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([_core_database_1.Otp, _core_database_1.ResetPasswordToken, _core_database_1.Token, _core_database_1.User]), user_module_1.UserModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            _business_core_modules_1.AuthService,
            _business_core_modules_1.AuthRepository,
            _business_core_modules_1.OtpRepository,
            _business_core_modules_1.ResetPasswordTokenRepository,
            _business_core_modules_1.TokenRepository,
            _business_core_modules_1.TokenRepository
        ],
        exports: [_business_core_modules_1.AuthService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
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
exports.AppJwtService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AppJwtService = class AppJwtService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    generateJWTToken(user, rememberMe) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                sub: user.id,
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.userType
            };
            const accessTokenExpiresIn = rememberMe
                ? parseInt(this.configService.get("jwt.expire_in_remember_me"))
                : parseInt(this.configService.get("jwt.expire_in"));
            const accessToken = this.jwtService.sign(payload, {
                secret: this.configService.get("jwt.secret"),
                expiresIn: accessTokenExpiresIn
            });
            const refreshPayload = {
                sub: user.id
            };
            const refreshToken = this.jwtService.sign(refreshPayload, {
                secret: this.configService.get("refresh_token.secret"),
                expiresIn: this.configService.get("refresh_token.expire_in")
            });
            return {
                accessToken,
                refreshToken
            };
        });
    }
    generateRefreshToken(user) {
        const refreshPayload = {
            sub: user.id,
            email: user.email
        };
        return this.jwtService.sign(refreshPayload, {
            secret: this.configService.get("refresh_token.secret"),
            expiresIn: this.configService.get("refresh_token.expire_in")
        });
    }
    verifyToken(token) {
        return this.jwtService.verify(token);
    }
    decodeToken(token) {
        return this.jwtService.decode(token);
    }
};
exports.AppJwtService = AppJwtService;
exports.AppJwtService = AppJwtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AppJwtService);
//# sourceMappingURL=app-jwt.service.js.map
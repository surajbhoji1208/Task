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
exports.ReqResInterceptor = void 0;
const _core_enums_1 = require("../enums");
const _core_utilities_1 = require("../utilities");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ReqResInterceptor = class ReqResInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, operators_1.map)((res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const request = _context.switchToHttp().getRequest();
            const lang = ((_a = request === null || request === void 0 ? void 0 : request.body) === null || _a === void 0 ? void 0 : _a.language_code) ||
                ((_b = request === null || request === void 0 ? void 0 : request.query) === null || _b === void 0 ? void 0 : _b.language_code) ||
                ((_c = request === null || request === void 0 ? void 0 : request.params) === null || _c === void 0 ? void 0 : _c.language_code) ||
                ((_d = request === null || request === void 0 ? void 0 : request.user) === null || _d === void 0 ? void 0 : _d.language_code) ||
                ((_e = request === null || request === void 0 ? void 0 : request.headers) === null || _e === void 0 ? void 0 : _e.language_code);
            if (res.message) {
                res.message = yield _core_utilities_1.Translation.Translator(lang || "en", _core_enums_1.TranslationFile.Success, res.message, res.parameters);
            }
            if (res.parameters)
                delete res.parameters;
            return res;
        })));
    }
};
exports.ReqResInterceptor = ReqResInterceptor;
exports.ReqResInterceptor = ReqResInterceptor = __decorate([
    (0, common_1.Injectable)()
], ReqResInterceptor);
//# sourceMappingURL=req-res.interceptor.js.map
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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _AllHttpExceptionFilter_logger;
var AllHttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllHttpExceptionFilter = void 0;
const _core_enums_1 = require("../enums");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const _core_utilities_1 = require("../utilities");
let AllHttpExceptionFilter = AllHttpExceptionFilter_1 = _a = class AllHttpExceptionFilter {
    constructor(configService) {
        this.configService = configService;
        _AllHttpExceptionFilter_logger.set(this, new common_1.Logger(AllHttpExceptionFilter_1.name));
    }
    catch(exception, host) {
        return __awaiter(this, void 0, void 0, function* () {
            var _b, _c, _d, _e, _f, _g;
            const ctx = host.switchToHttp();
            const request = ctx.getRequest();
            const response = ctx.getResponse();
            (0, _core_utilities_1.captureExceptionInSentry)(exception, request, this.configService);
            let status;
            let getResponse;
            if (exception instanceof typeorm_1.QueryFailedError) {
                status = common_1.HttpStatus.BAD_REQUEST;
                getResponse = (0, _core_utilities_1.handleDatabaseError)(exception);
            }
            else if (exception instanceof common_1.HttpException) {
                status = exception.getStatus();
                getResponse = exception.getResponse();
            }
            else {
                console.error("Unexpected Error in Exception Filter:", exception);
                status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                getResponse = { message: "ERR_INTERNAL_SERVER_ERROR" };
            }
            const lang = ((_b = request === null || request === void 0 ? void 0 : request.body) === null || _b === void 0 ? void 0 : _b.language_code) ||
                ((_c = request === null || request === void 0 ? void 0 : request.query) === null || _c === void 0 ? void 0 : _c.language_code) ||
                ((_d = request === null || request === void 0 ? void 0 : request.params) === null || _d === void 0 ? void 0 : _d.language_code) ||
                ((_e = request === null || request === void 0 ? void 0 : request.user) === null || _e === void 0 ? void 0 : _e.language_code) ||
                ((_f = request === null || request === void 0 ? void 0 : request.headers) === null || _f === void 0 ? void 0 : _f.language_code);
            const errors = yield this.filterResponse(getResponse, lang);
            console.log("errors: ", errors);
            response.status(status).json({
                message: ((_g = errors === null || errors === void 0 ? void 0 : errors[0]) === null || _g === void 0 ? void 0 : _g.displayError) || "ERR_INTERNAL_SERVER_ERROR",
                developerErrors: errors
            });
        });
    }
    filterResponse(response_1) {
        return __awaiter(this, arguments, void 0, function* (response, lang = "en") {
            try {
                let messages = [];
                let parameters = {};
                if (response && typeof response === "object" && response.message) {
                    if (Array.isArray(response.message)) {
                        messages = response.message;
                    }
                    else {
                        messages = [response.message];
                    }
                    parameters = response;
                }
                else if (typeof response === "string") {
                    messages = [response];
                }
                else if (Array.isArray(response)) {
                    messages = response;
                }
                const result = [];
                for (const msg of messages) {
                    if (!msg)
                        continue;
                    const parts = msg.split("&&&");
                    if (parts.length > 2) {
                        result.push({
                            key: parts[1],
                            errorType: "system",
                            actualError: yield _core_utilities_1.Translation.Translator("en", _core_enums_1.TranslationFile.Error, parts[0], parameters),
                            displayError: yield _core_utilities_1.Translation.Translator(lang, _core_enums_1.TranslationFile.Error, parts[2], parameters)
                        });
                    }
                    else {
                        result.push({
                            key: parts[0],
                            errorType: "ui",
                            actualError: yield _core_utilities_1.Translation.Translator("en", _core_enums_1.TranslationFile.Error, parts[0], parameters),
                            displayError: yield _core_utilities_1.Translation.Translator(lang, _core_enums_1.TranslationFile.Error, parts[0], parameters)
                        });
                    }
                }
                return result;
            }
            catch (error) {
                __classPrivateFieldGet(this, _AllHttpExceptionFilter_logger, "f").error("Error -- ", error);
            }
        });
    }
};
exports.AllHttpExceptionFilter = AllHttpExceptionFilter;
_AllHttpExceptionFilter_logger = new WeakMap();
exports.AllHttpExceptionFilter = AllHttpExceptionFilter = AllHttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AllHttpExceptionFilter);
//# sourceMappingURL=all-exceptions.filter.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _AppCacheService_logger;
var AppCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCacheService = void 0;
const _core_utilities_1 = require("../../utilities");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const app_profiler_service_1 = require("../profiler/app-profiler.service");
let AppCacheService = AppCacheService_1 = _a = class AppCacheService {
    constructor(cache, profilingService) {
        this.cache = cache;
        this.profilingService = profilingService;
        _AppCacheService_logger.set(this, new common_1.Logger(AppCacheService_1.name));
        this.listCacheKeys = new Map();
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.get.name);
            __classPrivateFieldGet(this, _AppCacheService_logger, "f").debug(`${logPrefix} : Getting cache - ${key}`);
            try {
                const value = yield this.cache.get(key);
                if (value !== undefined) {
                    this.profilingService.recordCacheHit();
                }
                else {
                    this.profilingService.recordCacheMiss();
                }
                return value;
            }
            catch (error) {
                __classPrivateFieldGet(this, _AppCacheService_logger, "f").error(`${logPrefix} : Error while getting cache - ${JSON.stringify(error)}`);
                throw error;
            }
        });
    }
    set(key_1, value_1) {
        return __awaiter(this, arguments, void 0, function* (key, value, ttl = 360, registerAsListCache) {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.set.name);
            __classPrivateFieldGet(this, _AppCacheService_logger, "f").debug(`${logPrefix} : Setting cache - ${key}`);
            __classPrivateFieldGet(this, _AppCacheService_logger, "f").debug(`${logPrefix} : Value - ${value}`);
            __classPrivateFieldGet(this, _AppCacheService_logger, "f").debug(`${logPrefix} : TTL - ${ttl}`);
            try {
                yield this.cache.set(key, value, ttl * 1000 * 60);
                if (registerAsListCache) {
                    this.registerListCacheKey(registerAsListCache.module, key);
                }
            }
            catch (error) {
                __classPrivateFieldGet(this, _AppCacheService_logger, "f").error(`${logPrefix} : Error while setting cache - ${JSON.stringify(error)}`);
                throw error;
            }
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.del.name);
            __classPrivateFieldGet(this, _AppCacheService_logger, "f").debug(`${logPrefix} : Deleting cache - ${key}`);
            try {
                yield this.cache.del(key);
            }
            catch (error) {
                __classPrivateFieldGet(this, _AppCacheService_logger, "f").error(`${logPrefix} : Error while deleting cache - ${JSON.stringify(error)}`);
                throw error;
            }
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.clear.name);
            try {
                yield this.cache.clear();
                __classPrivateFieldGet(this, _AppCacheService_logger, "f").warn(`${logPrefix} : Clear cache method called - implement cache clearing logic if needed`);
            }
            catch (error) {
                __classPrivateFieldGet(this, _AppCacheService_logger, "f").error(`${logPrefix} : Error while clearing cache - ${JSON.stringify(error)}`);
                throw error;
            }
        });
    }
    registerListCacheKey(module, key) {
        if (!this.listCacheKeys.has(module)) {
            this.listCacheKeys.set(module, new Set());
        }
        this.listCacheKeys.get(module).add(key);
    }
    clearListCachesByModule(module) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.clearListCachesByModule.name);
            try {
                const moduleKeys = this.listCacheKeys.get(module);
                if (moduleKeys && moduleKeys.size > 0) {
                    yield Promise.all(Array.from(moduleKeys).map((key) => this.del(key)));
                    moduleKeys.clear();
                    __classPrivateFieldGet(this, _AppCacheService_logger, "f").debug(`${logPrefix} : Cleared ${moduleKeys.size} list cache keys for module ${module}`);
                }
            }
            catch (error) {
                __classPrivateFieldGet(this, _AppCacheService_logger, "f").error(`${logPrefix} : Error while clearing list caches by module - ${error}`);
                throw error;
            }
        });
    }
};
exports.AppCacheService = AppCacheService;
_AppCacheService_logger = new WeakMap();
exports.AppCacheService = AppCacheService = AppCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, app_profiler_service_1.ProfilerService])
], AppCacheService);
//# sourceMappingURL=app-cache.service.js.map
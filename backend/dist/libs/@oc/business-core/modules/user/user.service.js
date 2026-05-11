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
var _a, _UserService_logger;
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const _business_core_dto_1 = require("../../dto");
const _core_constants_1 = require("../../../server-core/constants");
const _core_enums_1 = require("../../../server-core/enums");
const _core_shared_modules_1 = require("../../../server-core/shared-modules");
const _core_utilities_1 = require("../../../server-core/utilities");
const common_1 = require("@nestjs/common");
const response_1 = require("./dto/response");
const user_repository_1 = require("./user.repository");
let UserService = UserService_1 = _a = class UserService {
    constructor(userRepository, appCacheService, appMailerService) {
        this.userRepository = userRepository;
        this.appCacheService = appCacheService;
        this.appMailerService = appMailerService;
        _UserService_logger.set(this, new common_1.Logger(UserService_1.name));
        this.USER_CACHE_MODULE = _core_constants_1.MODULE_CONSTANTS.USER;
    }
    create(createUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.create.name);
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : Creating new user with email: ${createUserData.email}`);
            const existingUser = yield this.userRepository.findByEmail(createUserData.email, createUserData.userType);
            if (existingUser) {
                throw new common_1.BadRequestException({ message: "ERR_EMAIL_EXISTS" });
            }
            const user = this.userRepository.create(Object.assign(Object.assign({}, createUserData), { status: _core_enums_1.UserStatus.ACTIVE }));
            const savedUser = yield this.userRepository.save(user);
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : User created successfully with ID: ${savedUser.id}`);
            if (createUserData.userType == _core_enums_1.UserTypeEnum.USER) {
                yield this.appMailerService.sendUserOnboardingEmail(savedUser);
                __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : User onboarding email sent successfully`);
            }
            yield this.appCacheService.clearListCachesByModule(this.USER_CACHE_MODULE);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.AddSuccessAction, new response_1.UserResponseDto(savedUser), {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER)
            });
        });
    }
    validateEmailUniqueness(updateUserData, user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (updateUserData.email && updateUserData.email !== user.email) {
                const existingUser = yield this.userRepository.findByEmail(updateUserData.email, user.userType);
                if (existingUser && existingUser.id !== id) {
                    throw new common_1.BadRequestException({ message: "ERR_EMAIL_EXISTS" });
                }
            }
        });
    }
    update(id, updateUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.update.name);
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : Updating user with ID: ${id}`);
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw new common_1.NotFoundException({ message: "ERR_MODULE_NOT_FOUND", module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER) });
            }
            yield this.validateEmailUniqueness(updateUserData, user, id);
            Object.assign(user, updateUserData);
            const updatedUser = yield this.userRepository.save(user);
            console.log("updatedUser: ", updatedUser);
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : User updated successfully with ID: ${id}`);
            yield this.appCacheService.clearListCachesByModule(this.USER_CACHE_MODULE);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.UpdateSuccessAction, new response_1.UserResponseDto(updatedUser), {
                module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER)
            });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.remove.name);
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : Soft deleting user with ID: ${id}`);
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw new common_1.NotFoundException({ message: "ERR_MODULE_NOT_FOUND", module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER) });
            }
            yield this.userRepository.softRemove(user);
            yield this.appCacheService.clearListCachesByModule(this.USER_CACHE_MODULE);
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : User soft deleted successfully with ID: ${id}`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.RemoveSuccessAction, {}, { module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER) });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.findById.name);
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : Finding user by ID: ${id}`);
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw new common_1.NotFoundException({ message: "ERR_MODULE_NOT_FOUND", module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER) });
            }
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : User found`);
            const response = new response_1.UserResponseDto(user);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.DetailFetch, response, { module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER) });
        });
    }
    findList(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.findList.name);
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : Finding users list`);
            const [users, total] = yield this.userRepository.findUsers(searchRequest);
            const userDtos = users.map(user => new response_1.UserResponseDto(user));
            const response = new _business_core_dto_1.CommonSearchResponseDto(userDtos, searchRequest.pageSize || 10, searchRequest.pageNumber || 1, total);
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : Users list retrieved successfully`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, response, { module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER) });
        });
    }
    findDropdown(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const logPrefix = (0, _core_utilities_1.GenerateLogPrefix)(this.findDropdown.name);
            const cacheKey = (0, _core_utilities_1.GetCacheKey)(this.USER_CACHE_MODULE, "dropdown", true, searchRequest);
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : Finding user dropdown data`);
            const cachedData = yield this.appCacheService.get(cacheKey);
            if (cachedData) {
                __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : Dropdown data found in cache`);
                return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, cachedData, {
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER)
                });
            }
            const [users, total] = yield this.userRepository.findDropdown(searchRequest);
            const dropdownResponses = users.map((user) => new _business_core_dto_1.CommonDropdownResponseDto(user));
            const response = new _business_core_dto_1.CommonSearchResponseDto(dropdownResponses, searchRequest.pageSize || 10, searchRequest.pageNumber || 1, total);
            yield this.appCacheService.set(cacheKey, response, 360, { module: this.USER_CACHE_MODULE });
            __classPrivateFieldGet(this, _UserService_logger, "f").debug(`${logPrefix} : Dropdown data fetched and cached`);
            return new _business_core_dto_1.AppResponse(_core_constants_1.SuccessConstant.ListFetch, response, { module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER) });
        });
    }
    findUserByEmail(email, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findByEmail(email, userType);
        });
    }
    updateUserStatus(userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException({
                    message: "ERR_MODULE_NOT_FOUND",
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER)
                });
            }
            user.status = status;
            return this.userRepository.save(user);
        });
    }
    updateUserPassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new common_1.NotFoundException({
                    message: "ERR_MODULE_NOT_FOUND",
                    module: (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER)
                });
            }
            yield user.updatePassword(newPassword);
            yield this.userRepository.save(user);
        });
    }
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.save(user);
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findById(id);
        });
    }
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            return !!user;
        });
    }
};
exports.UserService = UserService;
_UserService_logger = new WeakMap();
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        _core_shared_modules_1.AppCacheService,
        _core_shared_modules_1.AppMailerService])
], UserService);
//# sourceMappingURL=user.service.js.map
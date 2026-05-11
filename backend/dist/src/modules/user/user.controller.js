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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const _business_core_dto_1 = require("../../../libs/@oc/business-core/dto");
const _business_core_modules_1 = require("../../../libs/@oc/business-core/modules");
const _core_custom_decorators_1 = require("../../../libs/@oc/server-core/custom-decorators");
const _core_custom_guards_1 = require("../../../libs/@oc/server-core/custom-guards");
const _core_enums_1 = require("../../../libs/@oc/server-core/enums");
const _core_utilities_1 = require("../../../libs/@oc/server-core/utilities");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const USER_MODULE_NAME = (0, _core_utilities_1.MapToModuleName)(_core_enums_1.ModuleName.USER);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.findList(query);
        });
    }
    getDropdown(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.findDropdown(query);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.findById(id);
        });
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.create(createUserDto);
        });
    }
    update(id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.remove(id);
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, _core_custom_decorators_1.ApiResponseStatus)("List all users with pagination, search, and filters", [common_1.HttpStatus.OK, common_1.HttpStatus.BAD_REQUEST], USER_MODULE_NAME, _business_core_dto_1.CommonSearchResponseDto, _business_core_modules_1.UserResponseDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.ListUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("dropdown"),
    (0, swagger_1.ApiOperation)({
        summary: "Get user dropdown data",
        description: "Returns id and combined first/last name for dropdown/autocomplete with lazy loading support"
    }),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Get user dropdown data", [common_1.HttpStatus.OK], USER_MODULE_NAME, _business_core_dto_1.CommonSearchResponseDto, _business_core_dto_1.CommonDropdownResponseDto),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.UserDropdownRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDropdown", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "User ID",
        example: "123e4567-e89b-12d3-a456-426614174000"
    }),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Get user by ID", [common_1.HttpStatus.OK, common_1.HttpStatus.NOT_FOUND, common_1.HttpStatus.BAD_REQUEST], USER_MODULE_NAME, _business_core_modules_1.UserResponseDto),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Create a new user", [common_1.HttpStatus.CREATED, common_1.HttpStatus.BAD_REQUEST, common_1.HttpStatus.CONFLICT], USER_MODULE_NAME, _business_core_modules_1.UserResponseDto),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_business_core_modules_1.CreateUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Update user details", [common_1.HttpStatus.OK, common_1.HttpStatus.BAD_REQUEST, common_1.HttpStatus.NOT_FOUND], USER_MODULE_NAME, _business_core_modules_1.UserResponseDto),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, _business_core_modules_1.UpdateUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "User ID",
        example: "123e4567-e89b-12d3-a456-426614174000"
    }),
    (0, _core_custom_decorators_1.ApiResponseStatus)("Soft delete user", [common_1.HttpStatus.OK, common_1.HttpStatus.NOT_FOUND], USER_MODULE_NAME),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)("Users"),
    (0, common_1.Controller)("users"),
    (0, common_1.UseGuards)(_core_custom_guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [_business_core_modules_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
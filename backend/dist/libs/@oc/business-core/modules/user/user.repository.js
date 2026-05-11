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
exports.UserRepository = void 0;
const _core_database_1 = require("../../../server-core/database");
const _core_enums_1 = require("../../../server-core/enums");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserRepository = class UserRepository extends typeorm_2.Repository {
    constructor(repository) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
    findUsers(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const qb = this.createQueryBuilder("user")
                .select([
                "user.id",
                "user.firstName",
                "user.lastName",
                "user.phoneNumber",
                "user.userType",
                "user.status",
                "user.createdAt",
                "user.dateOfBirth"
            ]);
            if (searchRequest.userType) {
                qb.andWhere("user.userType = :userType", { userType: searchRequest.userType });
            }
            if (searchRequest.status) {
                qb.andWhere("user.status = :status", { status: searchRequest.status });
            }
            if (searchRequest.searchText) {
                qb.andWhere("(user.firstName ILIKE :q OR user.lastName ILIKE :q OR user.email ILIKE :q OR CONCAT(user.firstName, ' ', user.lastName) ILIKE :q)", {
                    q: `%${searchRequest.searchText}%`
                });
            }
            const SORT_MAP = {
                firstName: "user.firstName",
                lastName: "user.lastName",
                email: "user.email",
                createdAt: "user.createdAt",
                updatedAt: "user.updatedAt"
            };
            const orderByField = (_a = SORT_MAP[searchRequest.sortBy]) !== null && _a !== void 0 ? _a : "user.createdAt";
            const orderDirection = searchRequest.sortDirection === _core_enums_1.SortDirection.ASC ? _core_enums_1.SortDirection.ASC : _core_enums_1.SortDirection.DESC;
            qb.orderBy(orderByField, orderDirection);
            const pageSize = searchRequest.pageSize || 10;
            const pageNumber = searchRequest.pageNumber || 1;
            const offset = (pageNumber - 1) * pageSize;
            if (!(pageNumber === 0 && pageSize === 0)) {
                qb.skip(offset).take(pageSize);
            }
            return qb.getManyAndCount();
        });
    }
    findByEmail(email, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.createQueryBuilder("user")
                .select([
                "user.id",
                "user.firstName",
                "user.lastName",
                "user.email",
                "user.password",
                "user.salt",
                "user.phoneNumber",
                "user.dateOfBirth",
                "user.userType",
                "user.status"
            ])
                .andWhere("user.email = :email", { email });
            if (userType !== undefined) {
                queryBuilder.andWhere("user.userType = :userType", { userType });
            }
            return queryBuilder.getOne();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder("user")
                .select([
                "user.id",
                "user.firstName",
                "user.lastName",
                "user.email",
                "user.password",
                "user.salt",
                "user.phoneNumber",
                "user.dateOfBirth",
                "user.userType",
                "user.status",
                "user.createdAt",
                "user.updatedAt"
            ])
                .andWhere("user.id = :id", { id })
                .getOne();
        });
    }
    findByEmails(emails) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.createQueryBuilder("user")
                .select(["user.id", "user.email"])
                .andWhere("user.email IN (:...emails)", { emails })
                .getMany();
            const emailIdMap = new Map();
            for (const user of users) {
                if (user.email) {
                    emailIdMap.set(user.email, user.id);
                }
            }
            return emailIdMap;
        });
    }
    findDropdown(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const qb = this.createQueryBuilder("user")
                .select(["user.id AS id", "CONCAT(user.firstName, ' ', user.lastName) AS name"])
                .andWhere("user.status = :status", { status: _core_enums_1.UserStatus.ACTIVE })
                .orderBy("user.firstName", _core_enums_1.SortDirection.ASC);
            if (searchRequest.userType) {
                qb.andWhere("user.userType = :userType", {
                    userType: searchRequest.userType
                });
            }
            if (searchRequest.searchText) {
                qb.andWhere(`(user.firstName ILIKE :q
          OR user.lastName ILIKE :q
          OR CONCAT(user.firstName, ' ', user.lastName) ILIKE :q)`, { q: `%${searchRequest.searchText}%` });
            }
            const pageSize = (_a = searchRequest.pageSize) !== null && _a !== void 0 ? _a : 10;
            const pageNumber = (_b = searchRequest.pageNumber) !== null && _b !== void 0 ? _b : 1;
            if (pageSize === 0 && pageNumber === 0) {
                const users = yield qb.getRawMany();
                const total = yield qb.getCount();
                return [users, total];
            }
            qb.skip((pageNumber - 1) * pageSize).take(pageSize);
            const users = yield qb.getRawMany();
            const total = yield qb.getCount();
            return [users, total];
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(_core_database_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map
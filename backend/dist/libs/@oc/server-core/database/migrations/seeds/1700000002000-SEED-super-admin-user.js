"use strict";
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
exports.SEEDSuperAdminUser1700000002000 = void 0;
const _core_enums_1 = require("../../../enums");
class SEEDSuperAdminUser1700000002000 {
    constructor() {
        this.name = "SEEDSuperAdminUser1700000002000";
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            INSERT INTO "user" (
                "first_name",
                "last_name",
                "email",
                "password",
                "salt",
                "user_type",
                "status",
                "created_at",
                "updated_at"
            ) VALUES (
                'Super',
                'Admin',
                'super.admin@yopmail.com',
                '$2b$10$1ghtT/.Nbem6NZk5ZQcFc.2H27XK2wXFaMQhfZPWRU.UIvY5PII9O',
                '$2b$10$1ghtT/.Nbem6NZk5ZQcFc.',
                '${_core_enums_1.UserTypeEnum.SUPER_ADMIN}',
                'ACTIVE',
                NOW(),
                NOW()
            )
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DELETE FROM "user"
            WHERE "email" = 'super.admin@yopmail.com'
        `);
        });
    }
}
exports.SEEDSuperAdminUser1700000002000 = SEEDSuperAdminUser1700000002000;
//# sourceMappingURL=1700000002000-SEED-super-admin-user.js.map
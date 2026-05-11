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
exports.InitialTenantSetup1700000000000 = void 0;
class InitialTenantSetup1700000000000 {
    constructor() {
        this.name = 'InitialTenantSetup1700000000000';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."user_user_type_enum" AS ENUM('2', '3', '4')`);
            yield queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION')`);
            yield queryRunner.query(`CREATE TABLE "user" ("created_by" uuid, "updated_by" uuid, "deleted_by" uuid, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(250), "salt" character varying(50), "phone_number" character varying(15), "date_of_birth" date, "age" integer, "user_type" "public"."user_user_type_enum" NOT NULL DEFAULT '4', "status" "public"."user_status_enum" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UK_USER_EMAIL_USER_TYPE" UNIQUE ("email", "user_type", "deleted_at"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "token" ("created_by" uuid, "updated_by" uuid, "deleted_by" uuid, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "access_token" text NOT NULL, "refresh_token" text NOT NULL, "remember_me" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "reset_password_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "updated_by" uuid, "deleted_by" uuid, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "reset_token" character varying(255) NOT NULL, "user_id" uuid NOT NULL, "expire_at" TIMESTAMP NOT NULL, "is_used" boolean NOT NULL DEFAULT false, "platform" character varying(50) NOT NULL, CONSTRAINT "PK_c6f6eb8f5c88ac0233eceb8d385" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TYPE "public"."otp_otp_type_enum" AS ENUM('1', '2', '3')`);
            yield queryRunner.query(`CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid, "updated_by" uuid, "deleted_by" uuid, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "otp_code" character varying(6) NOT NULL, "otp_type" "public"."otp_otp_type_enum" NOT NULL, "expire_at" TIMESTAMP NOT NULL, "is_used" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "reset_password_token" ADD CONSTRAINT "FK_4ec784f3b60e7ea2cafad470cc7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "FK_258d028d322ea3b856bf9f12f25" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "query-result-cache"`);
            yield queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "FK_258d028d322ea3b856bf9f12f25"`);
            yield queryRunner.query(`ALTER TABLE "reset_password_token" DROP CONSTRAINT "FK_4ec784f3b60e7ea2cafad470cc7"`);
            yield queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`);
            yield queryRunner.query(`DROP TABLE "otp"`);
            yield queryRunner.query(`DROP TYPE "public"."otp_otp_type_enum"`);
            yield queryRunner.query(`DROP TABLE "reset_password_token"`);
            yield queryRunner.query(`DROP TABLE "token"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
            yield queryRunner.query(`DROP TYPE "public"."user_user_type_enum"`);
        });
    }
}
exports.InitialTenantSetup1700000000000 = InitialTenantSetup1700000000000;
//# sourceMappingURL=1700000000000-initial-tenant-setup.js.map
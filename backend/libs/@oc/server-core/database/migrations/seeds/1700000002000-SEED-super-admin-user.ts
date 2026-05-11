import { UserTypeEnum } from "@core-enums";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SEEDSuperAdminUser1700000002000 implements MigrationInterface {
    name = "SEEDSuperAdminUser1700000002000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert super admin user
        await queryRunner.query(`
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
                '${UserTypeEnum.SUPER_ADMIN}',
                'ACTIVE',
                NOW(),
                NOW()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove super admin user
        await queryRunner.query(`
            DELETE FROM "user"
            WHERE "email" = 'super.admin@yopmail.com'
        `);
    }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductRatingsReviewSchema1746800000000 implements MigrationInterface {
    name = "ProductRatingsReviewSchema1746800000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "category" (
                "created_by" uuid,
                "updated_by" uuid,
                "deleted_by" uuid,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                CONSTRAINT "UK_CATEGORY_NAME" UNIQUE ("name"),
                CONSTRAINT "PK_category" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "product" (
                "created_by" uuid,
                "updated_by" uuid,
                "deleted_by" uuid,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "external_product_id" character varying(100) NOT NULL,
                "product_name" character varying(1000) NOT NULL,
                "category_id" uuid,
                "category_path" character varying(1000),
                "discounted_price" numeric(12,2),
                "actual_price" numeric(12,2),
                "discount_percentage" numeric(5,4),
                "rating" numeric(3,1),
                "rating_count" integer,
                "about_product" text,
                CONSTRAINT "UK_PRODUCT_EXTERNAL_ID" UNIQUE ("external_product_id"),
                CONSTRAINT "PK_product" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_PRODUCT_EXTERNAL_ID" ON "product" ("external_product_id")
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_PRODUCT_NAME" ON "product" ("product_name")
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_PRODUCT_RATING" ON "product" ("rating")
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_PRODUCT_RATING_COUNT" ON "product" ("rating_count")
        `);

        await queryRunner.query(`
            CREATE TABLE "review" (
                "created_by" uuid,
                "updated_by" uuid,
                "deleted_by" uuid,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "product_id" uuid NOT NULL,
                "user_name" character varying(500),
                "review_title" character varying(1000),
                "review_content" text,
                CONSTRAINT "UK_REVIEW_PRODUCT_USER_TITLE" UNIQUE ("product_id", "user_name", "review_title"),
                CONSTRAINT "PK_review" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_REVIEW_PRODUCT_ID" ON "review" ("product_id")
        `);

        await queryRunner.query(`
            CREATE TABLE "import_history" (
                "created_by" uuid,
                "updated_by" uuid,
                "deleted_by" uuid,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "file_name" character varying(255) NOT NULL,
                "total_records" integer NOT NULL DEFAULT 0,
                "imported_records" integer NOT NULL DEFAULT 0,
                "skipped_records" integer NOT NULL DEFAULT 0,
                "failed_records" integer NOT NULL DEFAULT 0,
                "status" character varying NOT NULL DEFAULT 'processing',
                "error_message" character varying(2000),
                CONSTRAINT "PK_import_history" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TYPE "import_history_status_enum" AS ENUM('processing', 'completed', 'failed')
        `);

        await queryRunner.query(`
            ALTER TABLE "import_history"
            ALTER COLUMN "status" TYPE "import_history_status_enum"
            USING "status"::"import_history_status_enum"
        `);

        await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_product_category_id"
            FOREIGN KEY ("category_id") REFERENCES "category"("id")
            ON DELETE SET NULL ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "review"
            ADD CONSTRAINT "FK_review_product_id"
            FOREIGN KEY ("product_id") REFERENCES "product"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_review_product_id"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_product_category_id"`);
        await queryRunner.query(`DROP INDEX "IDX_REVIEW_PRODUCT_ID"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP INDEX "IDX_PRODUCT_RATING_COUNT"`);
        await queryRunner.query(`DROP INDEX "IDX_PRODUCT_RATING"`);
        await queryRunner.query(`DROP INDEX "IDX_PRODUCT_NAME"`);
        await queryRunner.query(`DROP INDEX "IDX_PRODUCT_EXTERNAL_ID"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "import_history"`);
        await queryRunner.query(`DROP TYPE "import_history_status_enum"`);
    }
}

/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class CreatedAtUpdatedAt1748791983538 {
    name = 'CreatedAtUpdatedAt1748791983538'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "product_images" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "product_images" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    }
}

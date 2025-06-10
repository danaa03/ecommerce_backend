/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class ProductRelations1748972536719 {
    name = 'ProductRelations1748972536719'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }
}

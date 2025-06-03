/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class ProductRelations1748972546636 {
    name = 'ProductRelations1748972546636'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
    }
}

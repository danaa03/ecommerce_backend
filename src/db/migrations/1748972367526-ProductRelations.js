/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class ProductRelations1748972367526 {
    name = 'ProductRelations1748972367526'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "updated_at"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }
}

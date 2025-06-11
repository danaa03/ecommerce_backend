/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class AddedQuantityToCartItem1749139328131 {
    name = 'AddedQuantityToCartItem1749139328131'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "quantity" integer NOT NULL DEFAULT '0'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "quantity"`);
    }
}

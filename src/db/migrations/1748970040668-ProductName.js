/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class ProductName1748970040668 {
    name = 'ProductName1748970040668'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
    }
}

/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class ProductRelations1748971615666 {
    name = 'ProductRelations1748971615666'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying NOT NULL`);
    }
}

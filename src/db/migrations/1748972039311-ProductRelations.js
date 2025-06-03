/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class ProductRelations1748972039311 {
    name = 'ProductRelations1748972039311'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "profilePicture" text`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profilePicture"`);
    }
}

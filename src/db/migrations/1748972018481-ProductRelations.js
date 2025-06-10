/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class ProductRelations1748972018481 {
    name = 'ProductRelations1748972018481'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profilePicture"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "profilePicture" text`);
    }
}

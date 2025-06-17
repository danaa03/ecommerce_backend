/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class AddAccesTokenToUser1750077659708 {
    name = 'AddAccesTokenToUser1750077659708'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "accessToken" text`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accessToken"`);
    }
}

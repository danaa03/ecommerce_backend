/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class RefreshTokenAdded1748957896153 {
    name = 'RefreshTokenAdded1748957896153'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationToken" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationTokenExpires" TIMESTAMP`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationTokenExpires"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationToken"`);
    }
}

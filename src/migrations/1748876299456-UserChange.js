/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class UserChange1748876299456 {
    name = 'UserChange1748876299456'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" SET NOT NULL`);
    }
}

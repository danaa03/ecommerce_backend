/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class VerificationStatusAdded1748958583507 {
    name = 'VerificationStatusAdded1748958583507'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."users_verificationstatus_enum" AS ENUM('pending', 'verified')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationStatus" "public"."users_verificationstatus_enum" NOT NULL DEFAULT 'pending'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationStatus"`);
        await queryRunner.query(`DROP TYPE "public"."users_verificationstatus_enum"`);
    }
}

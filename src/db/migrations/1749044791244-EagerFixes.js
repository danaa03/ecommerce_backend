/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class EagerFixes1749044791244 {
    name = 'EagerFixes1749044791244'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'active'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'pending'`);
    }
}

/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class EagerFixes1749044804539 {
    name = 'EagerFixes1749044804539'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'pending'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'active'`);
    }
}

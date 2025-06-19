/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class IncreaseUserNameLength1750235058722 {
    name = 'IncreaseUserNameLength1750235058722';

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying(100)`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" TYPE character varying(30)`);
    }
}

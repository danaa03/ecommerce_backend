/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class MakeOrderAddressNotNull1749639052363 {
    name = 'MakeOrderAddressNotNull1749639052363'

    async up(queryRunner) {
        // Make address NOT NULL
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" SET NOT NULL`);
    }

    async down(queryRunner) {
        // Revert to allowing NULL
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" DROP NOT NULL`);
    }
}

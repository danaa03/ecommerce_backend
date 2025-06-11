/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class AddedTotalToOrder1749563130298 {
    name = 'AddedTotalToOrder1749563130298'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ADD "total_amount" numeric NOT NULL DEFAULT '0'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total_amount"`);
    }
}

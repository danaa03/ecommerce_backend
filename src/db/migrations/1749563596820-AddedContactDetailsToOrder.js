/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class AddedTotalToOrder1749563596820 {
    name = 'AddedTotalToOrder1749563596820'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ADD "address" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "phone" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "address"`);
    }
}

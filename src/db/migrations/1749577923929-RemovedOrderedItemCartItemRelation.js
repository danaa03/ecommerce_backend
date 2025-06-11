/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class RemovedOrderedItemCartItemRelation1749577923929 {
    name = 'RemovedOrderedItemCartItemRelation1749577923929'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP CONSTRAINT "FK_a5f60104e27e4cd16a42e96e7fa"`);
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP CONSTRAINT "UQ_a5f60104e27e4cd16a42e96e7fa"`);
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP COLUMN "cartItemId"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD "cartItemId" integer`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD CONSTRAINT "UQ_a5f60104e27e4cd16a42e96e7fa" UNIQUE ("cartItemId")`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD CONSTRAINT "FK_a5f60104e27e4cd16a42e96e7fa" FOREIGN KEY ("cartItemId") REFERENCES "cart_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}

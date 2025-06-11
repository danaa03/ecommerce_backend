/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class AddOrderedItemCartItemRelation1749576287208 {
    name = 'AddOrderedItemCartItemRelation1749576287208'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD "cartItemId" integer`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD CONSTRAINT "UQ_a5f60104e27e4cd16a42e96e7fa" UNIQUE ("cartItemId")`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD CONSTRAINT "FK_a5f60104e27e4cd16a42e96e7fa" FOREIGN KEY ("cartItemId") REFERENCES "cart_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP CONSTRAINT "FK_a5f60104e27e4cd16a42e96e7fa"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP CONSTRAINT "UQ_a5f60104e27e4cd16a42e96e7fa"`);
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP COLUMN "cartItemId"`);
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP COLUMN "price"`);
    }
}

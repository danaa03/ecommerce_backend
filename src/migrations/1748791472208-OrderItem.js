/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class OrderItem1748791472208 {
    name = 'OrderItem1748791472208'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "ordered_items" ("id" SERIAL NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "PK_5f623b6f9b30c697925d61e264a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD CONSTRAINT "FK_ea13b69171fccca8a4cbd915352" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordered_items" ADD CONSTRAINT "FK_b1e5d8b99bc749dfb668352ec3a" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP CONSTRAINT "FK_b1e5d8b99bc749dfb668352ec3a"`);
        await queryRunner.query(`ALTER TABLE "ordered_items" DROP CONSTRAINT "FK_ea13b69171fccca8a4cbd915352"`);
        await queryRunner.query(`DROP TABLE "ordered_items"`);
    }
}

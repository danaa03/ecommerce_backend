/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class OrderCart1748790953222 {
    name = 'OrderCart1748790953222'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "cartId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }
}

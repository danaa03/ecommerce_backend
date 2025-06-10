/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class ProductRelations1749042130418 {
    name = 'ProductRelations1749042130418'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "cartId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "REL_69828a178f152f157dcf2f70a8"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "REL_69828a178f152f157dcf2f70a8" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "userId" TO "cartId"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}

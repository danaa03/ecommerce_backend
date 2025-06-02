/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class InitSchema1748788148513 {
    name = 'InitSchema1748788148513'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_826d445d6b6f6edf0b7e11195b9"`);
        await queryRunner.query(`ALTER TABLE "product_images" RENAME COLUMN "userId" TO "productsId"`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_edd76b057391efaaa1e70a80b7b" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_edd76b057391efaaa1e70a80b7b"`);
        await queryRunner.query(`ALTER TABLE "product_images" RENAME COLUMN "productsId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_826d445d6b6f6edf0b7e11195b9" FOREIGN KEY ("userId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}

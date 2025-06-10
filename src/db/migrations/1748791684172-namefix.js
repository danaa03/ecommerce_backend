/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class Namefix1748791684172 {
    name = 'Namefix1748791684172'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_edd76b057391efaaa1e70a80b7b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e097ef003102ce5154a845bbd28"`);
        await queryRunner.query(`ALTER TABLE "product_images" RENAME COLUMN "productsId" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "productsId" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_b367708bf720c8dd62fc6833161" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0"`);
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_b367708bf720c8dd62fc6833161"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "productId" TO "productsId"`);
        await queryRunner.query(`ALTER TABLE "product_images" RENAME COLUMN "productId" TO "productsId"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e097ef003102ce5154a845bbd28" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_edd76b057391efaaa1e70a80b7b" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}

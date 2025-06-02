/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class InitSchema1748788059712 {
    name = 'InitSchema1748788059712'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "product_images" ("id" SERIAL NOT NULL, "image_path" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_826d445d6b6f6edf0b7e11195b9" FOREIGN KEY ("userId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_826d445d6b6f6edf0b7e11195b9"`);
        await queryRunner.query(`DROP TABLE "product_images"`);
    }
}

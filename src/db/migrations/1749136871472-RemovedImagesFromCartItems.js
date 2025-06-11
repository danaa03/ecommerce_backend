/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class RemovedImagesFromCartItems1749136871472 {
    name = 'RemovedImagesFromCartItems1749136871472'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "image_path"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "image_path" character varying NOT NULL`);
    }
}

/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class CommentUserRelation1749043866372 {
    name = 'CommentUserRelation1749043866372'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "pictures"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" ADD "pictures" character varying NOT NULL`);
    }
}

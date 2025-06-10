/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class CommentUserRelation1749043526649 {
    name = 'CommentUserRelation1749043526649'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userId"`);
    }
}

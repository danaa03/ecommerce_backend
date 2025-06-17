/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class AddAddressToUser1750068248007 {
    name = 'AddAddressToUser1750068248007'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "address"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_address_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address" text`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address" "public"."users_address_enum" NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TYPE "public"."users_address_enum" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "address" TO "role"`);
    }
}

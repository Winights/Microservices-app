import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBalanceAndIsDeleted1794585004634 implements MigrationInterface {
    name = 'AddBalanceAndIsDeleted1794585004634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."balance" IS 'Баланс пользователя'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isDeleted" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."isDeleted" IS 'Был ли удален аккаунт'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."isDeleted" IS 'Флаг мягкого удаления (true, если пользователь удален)'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isDeleted" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."balance" IS 'Баланс пользователя (в копейках/центах)'`);
    }

}

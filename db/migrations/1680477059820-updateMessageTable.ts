import { MigrationInterface, QueryRunner } from "typeorm";

export class updateMessageTable1680477059820 implements MigrationInterface {
    name = 'updateMessageTable1680477059820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`room\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`sender\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`userName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`text\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`text\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`userName\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`sender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`room\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`message\` varchar(255) NOT NULL`);
    }

}

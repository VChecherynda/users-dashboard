import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessageEntity1680562266793 implements MigrationInterface {
    name = 'UpdateMessageEntity1680562266793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`text\` \`message\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`message\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`message\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`message\` \`text\` varchar(255) NOT NULL`);
    }

}

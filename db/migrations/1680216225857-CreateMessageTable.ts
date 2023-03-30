import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMessageTable1680216225857 implements MigrationInterface {
  name = 'CreateMessageTable1680216225857';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`message\` (\`id\` varchar(36) NOT NULL, \`room\` varchar(255) NOT NULL, \`sender\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_5b87d9d19127bd5d92026017a7b\``,
    );
    await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`note\` ADD \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`note\` ADD CONSTRAINT \`FK_5b87d9d19127bd5d92026017a7b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_5b87d9d19127bd5d92026017a7b\``,
    );
    await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`note\` ADD \`userId\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`note\` ADD CONSTRAINT \`FK_5b87d9d19127bd5d92026017a7b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE \`message\``);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1679516039582 implements MigrationInterface {
  name = 'createTables1679516039582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`roleId\` varchar(255) NOT NULL DEFAULT 'user', \`name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`location\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`note\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`note\` ADD CONSTRAINT \`FK_5b87d9d19127bd5d92026017a7b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_5b87d9d19127bd5d92026017a7b\``,
    );
    await queryRunner.query(`DROP TABLE \`note\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}

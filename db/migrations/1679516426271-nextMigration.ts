import { MigrationInterface, QueryRunner } from 'typeorm';

export class nextMigration1679516426271 implements MigrationInterface {
  name = 'nextMigration1679516426271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`language\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`language\``);
  }
}

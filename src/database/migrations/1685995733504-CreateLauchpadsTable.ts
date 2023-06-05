import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLaunchpadsTable1685995733504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'launchpads',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'full_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'locality',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'region',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'timezone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'latitude',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'longitude',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'launch_attempts',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'launch_successes',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'rockets',
            type: 'json',
            isNullable: false,
            default: '',
          },
          {
            name: 'launches',
            type: 'varchar',
            isNullable: false,
            default: '',
          },
          {
            name: 'status',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'details',
            type: 'text',
            isNullable: false,
            default: '',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('launchpads');
  }
}

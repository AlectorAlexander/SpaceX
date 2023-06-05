import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLaunchesTable1685995723519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'launchs',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'links',
            type: 'json',
            isNullable: true,
            default: '{}',
          },
          {
            name: 'reddit',
            type: 'json',
            isNullable: true,
            default: '{}',
          },
          {
            name: 'flickr',
            type: 'json',
            isNullable: true,
            default: '{}',
          },
          {
            name: 'tdb',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'net',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'window',
            type: 'integer',
            isNullable: true,
            default: 0,
          },
          {
            name: 'rocket',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'success',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'failures',
            type: 'json',
            isNullable: true,
            default: '[]',
          },
          {
            name: 'details',
            type: 'text',
            isNullable: true,
            default: '',
          },
          {
            name: 'crew',
            type: 'json',
            isNullable: true,
            default: '[]',
          },
          {
            name: 'cores',
            type: 'json',
            isNullable: true,
            default: '[]',
          },
          {
            name: 'ships',
            type: 'json',
            isNullable: true,
            default: '[]',
          },
          {
            name: 'capsules',
            type: 'json',
            isNullable: true,
            default: '[]',
          },
          {
            name: 'payloads',
            type: 'json',
            isNullable: true,
            default: '[]',
          },
          {
            name: 'launchpad',
            type: 'varchar',
            isNullable: true,
            default: '',
          },
          {
            name: 'upcoming',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'auto_update',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
            default: '',
          },
          {
            name: 'date_utc',
            type: 'varchar',
            isNullable: true,
            default: '',
          },
          {
            name: 'date_unix',
            type: 'integer',
            isNullable: true,
            default: 0,
          },
          {
            name: 'date_local',
            type: 'varchar',
            isNullable: true,
            default: '',
          },
          {
            name: 'date_precision',
            type: 'varchar',
            isNullable: true,
            default: '',
          },
          {
            name: 'date_tbd',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'date_tbd_window',
            type: 'integer',
            isNullable: true,
            default: 0,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('launchs');
  }
}

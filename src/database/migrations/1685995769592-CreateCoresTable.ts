import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCoresTable1685995769592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cores',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'block',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'reuse_count',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'rtls_attempts',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'rtls_landings',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'asds_attempts',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'asds_landings',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'last_update',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'launches',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'serial',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
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
    await queryRunner.dropTable('cores');
  }
}

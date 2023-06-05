import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCapsulesTable1685995611851 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'capsules',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'reuse_count',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'water_landings',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'land_landings',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'last_update',
            type: 'varchar',
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
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'launches',
            type: 'json',
            isArray: true,
            default: '[]',
            isNullable: false,
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
    await queryRunner.dropTable('capsules');
  }

}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRocketsTable1685995713143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rockets',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'height',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'diameter',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'mass',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'first_stage',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'second_stage',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'engines',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'landing_legs',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'payload_weights',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'flickr_images',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'stages',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'boosters',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'cost_per_launch',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'success_rate_pct',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'first_flight',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'company',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'wikipedia',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rockets');
  }
}

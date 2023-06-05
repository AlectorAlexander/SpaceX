import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePayloadsTable1685995751542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payloads',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'dragon',
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
            name: 'reused',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'launch',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'customers',
            type: 'json',
            isNullable: true,
            default: '[]',
          },
          {
            name: 'norad_ids',
            type: 'json',
            isNullable: true,
            default: '[]',
          },
          {
            name: 'nationalities',
            type: 'json',
            isNullable: true,
            default: '[]',
          },
          {
            name: 'manufacturers',
            type: 'json',
            isNullable: true,
            default: '[]',
          },
          {
            name: 'mass_kg',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'mass_lbs',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'orbit',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reference_system',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'regime',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'longitude',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'semi_major_axis_km',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'eccentricity',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'periapsis_km',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'apoapsis_km',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'inclination_deg',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'period_min',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'lifespan_years',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'epoch',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mean_motion',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'raan',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'arg_of_pericenter',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'mean_anomaly',
            type: 'float',
            isNullable: true,
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
            default: null,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payloads');
  }
}

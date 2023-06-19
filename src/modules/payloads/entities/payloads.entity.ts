import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { LaunchEntity } from '../../launches/entities/launches.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'payloads' })
export class PayloadEntity {
  @PrimaryColumn()
  @ApiProperty({ example: '5eb0e4b5b6c3bb0006eeb1e1' })
  id: string;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({
    example: {
      capsule: null,
      mass_returned_kg: null,
      mass_returned_lbs: null,
      flight_time_sec: null,
      manifest: null,
      water_landing: null,
      land_landing: null,
    },
    description: 'Contém informações sobre a espaçonave Dragon.',
  })
  dragon: {
    capsule: null | string;
    mass_returned_kg: null | number;
    mass_returned_lbs: null | number;
    flight_time_sec: null | number;
    manifest: null | string;
    water_landing: null | boolean;
    land_landing: null | boolean;
  };

  @Column()
  @ApiProperty({ example: 'FalconSAT-2', description: 'Nome da carga útil.' })
  name: string;

  @Column()
  @ApiProperty({ example: 'Satellite', description: 'Tipo da carga útil.' })
  type: string;

  @Column()
  @ApiProperty({ example: false, description: 'Indica se a carga útil foi reutilizada.' })
  reused: boolean;

  @Column()
  @ApiProperty({ example: '5eb87cd9ffd86e000604b32a', description: 'ID do lançamento associado à carga útil.' })
  launch: string;

  @Column('text', { array: true })
  @ApiProperty({ example: ['DARPA'], description: 'Clientes da carga útil.' })
  customers: string[];

  @Column('int', { array: true })
  @ApiProperty({ example: [], description: 'IDs NORAD associados à carga útil.' })
  norad_ids: number[];

  @Column('text', { array: true })
  @ApiProperty({ example: ['United States'], description: 'Nacionalidades associadas à carga útil.' })
  nationalities: string[];

  @Column('text', { array: true })
  @ApiProperty({ example: ['SSTL'], description: 'Fabricantes da carga útil.' })
  manufacturers: string[];

  @Column()
  @ApiProperty({ example: 20, description: 'Massa da carga útil em quilogramas.' })
  mass_kg: number;

  @Column()
  @ApiProperty({ example: 43, description: 'Massa da carga útil em libras.' })
  mass_lbs: number;

  @Column()
  @ApiProperty({ example: 'LEO', description: 'Órbita da carga útil.' })
  orbit: string;

  @Column()
  @ApiProperty({ example: 'geocentric', description: 'Sistema de referência da carga útil.' })
  reference_system: string;

  @Column()
  @ApiProperty({ example: 'low-earth', description: 'Regime da carga útil.' })
  regime: string;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({ example: null, description: 'Longitude da carga útil.' })
  longitude: number;

  @Column()
  @ApiProperty({ example: null, description: 'Eixo semi-maior da carga útil em quilômetros.' })
  semi_major_axis_km: number;

  @Column()
  @ApiProperty({ example: null, description: 'Excentricidade da carga útil.' })
  eccentricity: number;

  @Column()
  @ApiProperty({ example: 400, description: 'Periapsis da carga útil em quilômetros.' })
  periapsis_km: number;

  @Column()
  @ApiProperty({ example: 500, description: 'Apoapsis da carga útil em quilômetros.' })
  apoapsis_km: number;

  @Column()
  @ApiProperty({ example: 39, description: 'Inclinação da carga útil em graus.' })
  inclination_deg: number;

  @Column()
  @ApiProperty({ example: null, description: 'Período da carga útil em minutos.' })
  period_min: number;

  @Column()
  @ApiProperty({ example: null, description: 'Tempo de vida útil da carga útil em anos.' })
  lifespan_years: number;

  @Column()
  @ApiProperty({ example: null, description: 'Época da carga útil.' })
  epoch: string;

  @Column()
  @ApiProperty({ example: null, description: 'Movimento médio da carga útil.' })
  mean_motion: number;

  @Column()
  @ApiProperty({ example: null, description: 'RAAN (Right Ascension of the Ascending Node) da carga útil.' })
  raan: number;

  @Column()
  @ApiProperty({ example: null, description: 'Argumento do pericentro da carga útil.' })
  arg_of_pericenter: number;

  @Column()
  @ApiProperty({ example: null, description: 'Anomalia média da carga útil.' })
  mean_anomaly: number;

  @OneToOne(() => LaunchEntity)
  @JoinColumn({ name: 'launch', referencedColumnName: 'id' })
  launchPayload: LaunchEntity;
}

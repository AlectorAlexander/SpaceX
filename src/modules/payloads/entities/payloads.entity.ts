import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { LaunchEntity } from '../../launches/entities/launches.entity';

@Entity({ name: 'payloads' })
export class PayloadEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'json', nullable: true })
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
  name: string;

  @Column()
  type: string;

  @Column()
  reused: boolean;

  @Column()
  launch: string;

  @Column('text', { array: true })
  customers: string[];

  @Column('int', { array: true })
  norad_ids: number[];

  @Column('text', { array: true })
  nationalities: string[];

  @Column('text', { array: true })
  manufacturers: string[];

  @Column()
  mass_kg: number;

  @Column()
  mass_lbs: number;

  @Column()
  orbit: string;

  @Column()
  reference_system: string;

  @Column()
  regime: string;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column()
  semi_major_axis_km: number;

  @Column()
  eccentricity: number;

  @Column()
  periapsis_km: number;

  @Column()
  apoapsis_km: number;

  @Column()
  inclination_deg: number;

  @Column()
  period_min: number;

  @Column()
  lifespan_years: number;

  @Column()
  epoch: string;

  @Column()
  mean_motion: number;

  @Column()
  raan: number;

  @Column()
  arg_of_pericenter: number;

  @Column()
  mean_anomaly: number;

  @OneToOne(() => LaunchEntity)
  @JoinColumn({ name: 'launch', referencedColumnName: 'id' })
  launchPayload: LaunchEntity;
}

import { LaunchEntity } from '../../launches/entities/launches.entity';
import { Column, Entity, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'launchpads' })
export class LaunchpadEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  full_name: string;

  @Column()
  locality: string;

  @Column()
  region: string;

  @Column()
  timezone: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  launch_attempts: number;

  @Column()
  launch_successes: number;

  @Column('text', { array: true })
  rockets: string[];

  @OneToMany(() => LaunchEntity, launch => launch.launchpad)
  @JoinColumn({ name: 'id' })
  @Column('text', { array: false })
  launches: LaunchEntity;

  @Column()
  status: string;

  @Column()
  details: string;

}

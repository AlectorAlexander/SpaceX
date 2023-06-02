import { LaunchEntity } from 'src/modules/launchs/entities/launches.entity';
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';

@Entity({ name: 'launchpads' })
export class LaunchPadEntity {
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
  rocketIds: string[];

  @Column('text', { array: true })
  launchIds: string[];

  @Column()
  status: string;

  @Column()
  details: string;

  @OneToMany(() => LaunchEntity, launch => launch.launchPad)
  launches: LaunchEntity[];
}

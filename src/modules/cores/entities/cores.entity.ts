import { Column, Entity, PrimaryColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { LaunchEntity } from '../../launches/entities/launches.entity';

@Entity({ name: 'cores' })
export class CoreEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  block: number;

  @Column()
  reuse_count: number;

  @Column()
  rtls_attempts: number;

  @Column()
  rtls_landings: number;

  @Column()
  asds_attempts: number;

  @Column()
  asds_landings: number;

  @Column()
  last_update: string;

  @ManyToMany(() => LaunchEntity, launch => launch.cores)
  @JoinColumn({ name: 'id' })
  @Column('text', { array: true })
  launches: LaunchEntity[];

  @Column()
  serial: string;

  @Column()
  status: string;
}

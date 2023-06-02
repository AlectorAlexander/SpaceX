import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { LaunchEntity } from 'src/modules/launchs/entities/launches.entity';

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

  @Column('text', { array: true })
  launchIds: string[];

  @Column()
  serial: string;

  @Column()
  status: string;

  @ManyToMany(() => LaunchEntity)
  @JoinTable({
    name: 'launch_core',
    joinColumn: {
      name: 'coreId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'launchId',
      referencedColumnName: 'id',
    },
  })
  launches: LaunchEntity[];
}

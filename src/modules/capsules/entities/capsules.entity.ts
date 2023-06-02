import { LaunchEntity } from 'src/modules/launchs/entities/launches.entity';
import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'capsules' })
export class CapsuleEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  reuse_count: number;

  @Column()
  water_landings: number;

  @Column()
  land_landings: number;

  @Column()
  last_update: string;

  @Column('text', { array: true })
  launches: string[];

  @Column()
  serial: string;

  @Column()
  status: string;

  @Column()
  type: string;

  @OneToOne(() => LaunchEntity, (launch) => launch.capsules)
  @JoinColumn({ name: 'capsuleId' })
  launch: LaunchEntity;
}

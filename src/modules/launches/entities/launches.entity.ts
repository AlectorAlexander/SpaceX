import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import { Cores, Flickr, Links, Reddit } from '../dtos/launches.dto';
import { LaunchpadEntity } from '../..//launchpads/entities/launchpads.entity';
import { CoreEntity } from '../..//cores/entities/cores.entity';
import { CapsulesEntity } from '../..//capsules/entities/capsules.entity';
import { PayloadEntity } from '../..//payloads/entities/payloads.entity';

@Entity({ name: 'launchs' })
export class LaunchEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type: 'varchar'})
  links: Links;

  @Column({type: 'varchar'})
  reddit: Reddit;

  @Column({type: 'varchar'})
  flickr: Flickr;

  @Column()
  tdb: boolean;

  @Column()
  net: boolean;

  @Column()
  window: number;

  @Column()
  rocket: string;

  @Column()
  success: boolean;

  @Column({type: 'varchar'})
  failures: object;

  @Column()
  details: string;

  @Column({type: 'varchar'})
  crew: string[];

  @Column({type: 'varchar'})
  ships: string[];

  @OneToMany(() => CapsulesEntity, capsule => capsule.launch)
  @JoinColumn({ name: 'id' })
  @Column('varchar', { array: true })
  capsules: string[];

  @Column({type: 'varchar'})
  payloads: string[];

  @ManyToOne(() => LaunchpadEntity, launchpad => launchpad.launches)
  @JoinColumn({ name: 'id' })
  @Column('text', { array: true })
  launchpad: LaunchpadEntity[];
  

  @Column()
  upcoming: boolean;

  @Column({name: 'auto_update', type: 'boolean'})
  autoUpdate: boolean;

  @Column()
  name: string;
  
  @ManyToMany(() => CoreEntity, core => core.launches)
  @JoinTable({
    name: 'launch_cores',
    joinColumn: {
      name: 'launches',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'cores',
      referencedColumnName: 'id',
    },
  })
  @Column('text', { array: true })
  cores: Cores[];

  @Column({name: 'date_utc', type: 'varchar', length: 50})
  dateUtc: string;

  @Column({name: 'date_unix', type: 'int'})
  dateUnix: number;

  @Column({name: 'date_local', type: 'varchar', length: 50})
  dateLocal: string;

  @Column({name: 'date_precision', type: 'varchar', length: 50})
  datePrecision: string;

  @Column({name: 'date_tbd', type: 'boolean', default: false})
  dateTbd: boolean;

  @Column({name: 'date_tbd_window', type: 'int', default: 0})
  dateTbdWindow: number;



  @OneToMany(() => PayloadEntity, payload => payload.launch)
  payloadsId: PayloadEntity[];
}

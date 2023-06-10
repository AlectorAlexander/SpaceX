import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import { Flickr, Links, Reddit } from '../dtos/launches.dto';
import { RocketEntity } from 'src/modules/rockets/entities/rockets.entity';
import { LaunchpadEntity } from 'src/modules/launchpads/entities/launchpads.entity';
import { CoreEntity } from 'src/modules/cores/entities/cores.entity';
import { CapsulesEntity } from 'src/modules/capsules/entities/capsules.entity';
import { PayloadEntity } from 'src/modules/payloads/entities/payloads.entity';

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

  @ManyToOne(() => RocketEntity, rocket => rocket.launch)
  @JoinColumn({ name: 'id' })
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

  @Column({type: 'varchar'})
  capsules: string[];

  @Column({type: 'varchar'})
  payloads: string[];

  @ManyToOne(() => LaunchpadEntity, launchPad => launchPad.launches)
    @JoinColumn({ name: 'id' })
  launchPad: LaunchpadEntity;

  @Column()
  upcoming: boolean;

  @Column({name: 'auto_update', type: 'boolean'})
  autoUpdate: boolean;

  @Column()
  name: string;

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

  @ManyToMany(() => CoreEntity, core => core.launches)
  @JoinTable({
    name: 'launch_core',
    joinColumn: {
      name: 'launchId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'coreId',
      referencedColumnName: 'id',
    },
  })
  cores: CoreEntity[];

  @OneToMany(() => CapsulesEntity, capsule => capsule.launch)
  capsulesId: CapsulesEntity[];

  @OneToMany(() => PayloadEntity, payload => payload.launch)
  payloadsId: PayloadEntity[];
}

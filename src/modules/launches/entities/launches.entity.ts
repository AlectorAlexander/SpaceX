import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Flickr, Links, Reddit } from '../dtos/launches.dto';
import { RocketEntity } from 'src/modules/rockets/entities/rockets.entity';
import { LaunchpadEntity } from 'src/modules/launchpads/entities/launchpads.entity';
import { CoreEntity } from 'src/modules/cores/entities/cores.entity';
import { CapsulesEntity } from 'src/modules/capsules/entities/capsules.entity';
import { PayloadEntity } from 'src/modules/payloads/entities/payloads.entity';

@Entity({ name: 'launches' })
export class LaunchEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  links: Links;

  @Column()
  reddit: Reddit;

  @Column()
  flickr: Flickr;

  @Column()
  tdb: boolean;

  @Column()
  net: boolean;

  @Column()
  window: number;

  @ManyToOne(() => RocketEntity, rocket => rocket.launch)
  rocket: string;

  @Column()
  success: boolean;

  @Column()
  failures: object;

  @Column()
  details: string;

  @Column()
  crew: string[];

  @Column()
  ships: string[];

  @Column()
  capsulesId: string[];

  @Column()
  payloadsIds: string[];

  @ManyToOne(() => LaunchpadEntity, launchPad => launchPad.launches)
  launchPad: LaunchpadEntity;

  @Column()
  upcoming: boolean;

  @Column()
  autoUpdate: boolean;

  @Column()
  name: string;

  @Column()
  dateUtc: string;

  @Column()
  dateUnix: number;

  @Column()
  dateLocal: string;

  @Column()
  datePrecision: string;

  @Column()
  dateTbd: boolean;

  @Column()
  dateTbdWindow: number;

  @ManyToMany(() => CoreEntity)
  cores: CoreEntity[];

  @OneToMany(() => CapsulesEntity, capsule => capsule.launch)
  capsules: CapsulesEntity[];

  @OneToMany(() => PayloadEntity, payload => payload.launch)
  payloads: PayloadEntity[];
}

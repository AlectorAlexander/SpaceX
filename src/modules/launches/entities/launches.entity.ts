import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import { Cores, Flickr, Links, Reddit } from '../dtos/launches.dto';
import { LaunchpadEntity } from '../..//launchpads/entities/launchpads.entity';
import { CoreEntity } from '../..//cores/entities/cores.entity';
import { CapsulesEntity } from '../..//capsules/entities/capsules.entity';
import { PayloadEntity } from '../..//payloads/entities/payloads.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'launchs' })
export class LaunchEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '5eb87cd9ffd86e000604b32a' })
  id: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: {
    patch: {
      large: 'https://images2.imgbox.com/5b/02/QcxHUb5V_o.png',
      small: 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png',
    },
    flickr: {
      small: [],
      original: [],
    },
    reddit: {
      media: null,
      launch: null,
      campaign: null,
      recovery: null,
    },
    article: 'https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html',
    webcast: 'https://www.youtube.com/watch?v=0a_00nJ_Y88',
    presskit: null,
    wikipedia: 'https://en.wikipedia.org/wiki/DemoSat',
    youtube_id: '0a_00nJ_Y88',
  }, description: 'Descrição dos links relacionados ao lançamento.' })
  links: Links;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: null, description: 'Objeto contendo informações relacionadas ao Reddit.' })
  reddit: Reddit;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: null, description: 'Objeto contendo informações relacionadas ao Flickr.' })
  flickr: Flickr;

  @Column()
  @ApiProperty({ example: false, description: 'Indica se a data do lançamento está a confirmar.' })
  tdb: boolean;

  @Column()
  @ApiProperty({ example: false, description: 'Indica se o lançamento está programado para a data atual.' })
  net: boolean;

  @Column()
  @ApiProperty({ example: 0, description: 'Janela de lançamento em segundos.' })
  window: number;

  @Column()
  @ApiProperty({ example: '5e9d0d95eda69955f709d1eb', description: 'ID do foguete relacionado ao lançamento.' })
  rocket: string;

  @Column()
  @ApiProperty({ example: false, description: 'Indica se o lançamento foi bem sucedido.' })
  success: boolean;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: [{
    time: 33,
    reason: 'merlin engine failure',
    altitude: null,
  }], description: 'Falhas relacionadas ao lançamento.' })
  failures: object;

  @Column()
  @ApiProperty({ example: 'Engine failure at 33 seconds and loss of vehicle', description: 'Detalhes do lançamento.' })
  details: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: [], description: 'Lista de nomes da tripulação associada ao lançamento.' })
  crew: string[];

  @Column({ type: 'varchar' })
  @ApiProperty({ example: [], description: 'Lista de IDs das espaçonaves associadas ao lançamento.' })
  ships: string[];

  @OneToMany(() => CapsulesEntity, capsule => capsule.launch)
  @JoinColumn({ name: 'id' })
  @Column('varchar', { array: true })
  @ApiProperty({ example: [], description: 'Lista de IDs das cápsulas associadas ao lançamento.' })
  capsules: string[];

  @Column({ type: 'varchar' })
  @ApiProperty({ example: ['5eb0e4b5b6c3bb0006eeb1e1'], description: 'Lista de IDs das cargas úteis associadas ao lançamento.' })
  payloads: string[];

  @ManyToOne(() => LaunchpadEntity, launchpad => launchpad.launches)
  @JoinColumn({ name: 'id' })
  @Column('text', { array: true })
  @ApiProperty({ example: null, description: 'Informações sobre o local de lançamento.' })
  launchpad: LaunchpadEntity[];

  @Column()
  @ApiProperty({ example: false, description: 'Indica se o lançamento está programado para o futuro.' })
  upcoming: boolean;

  @Column({ name: 'auto_update', type: 'boolean' })
  @ApiProperty({ example: true, description: 'Indica se o lançamento deve ser atualizado automaticamente.' })
  autoUpdate: boolean;

  @Column()
  @ApiProperty({ example: 'FalconSat', description: 'Nome do lançamento.' })
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
  @ApiProperty({ example: [{
    core: '5e9e289df35918033d3b2623',
    legs: false,
    flight: 1,
    reused: false,
    landpad: null,
    gridfins: false,
    landing_type: null,
    landing_attempt: false,
    landing_success: null,
  }], description: 'Lista de objetos contendo informações sobre os núcleos relacionados ao lançamento.' })
  cores: Cores[];

  @Column({ name: 'date_utc', type: 'varchar', length: 50 })
  @ApiProperty({ example: '2006-03-24T22:30:00.000Z', description: 'Data e hora do lançamento em UTC.' })
  dateUtc: string;

  @Column({ name: 'date_unix', type: 'int' })
  @ApiProperty({ example: 1143239400, description: 'Data e hora do lançamento em formato Unix.' })
  dateUnix: number;

  @Column({ name: 'date_local', type: 'varchar', length: 50 })
  @ApiProperty({ example: '2006-03-25T10:30:00+12:00', description: 'Data e hora do lançamento no fuso horário local.' })
  dateLocal: string;

  @Column({ name: 'date_precision', type: 'varchar', length: 50 })
  @ApiProperty({ example: 'hour', description: 'Precisão da data e hora do lançamento.' })
  datePrecision: string;

  @Column({ name: 'date_tbd', type: 'boolean', default: false })
  @ApiProperty({ example: null, description: 'Indica se a data do lançamento ainda não foi determinada.' })
  dateTbd: boolean;

  @Column({ name: 'date_tbd_window', type: 'int', default: 0 })
  @ApiProperty({ example: null, description: 'Janela de tempo em segundos para o lançamento quando a data ainda não foi determinada.' })
  dateTbdWindow: number;

  @OneToMany(() => PayloadEntity, payload => payload.launch)
  payloadsId: PayloadEntity[];
}

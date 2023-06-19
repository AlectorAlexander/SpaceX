import { LaunchEntity } from '../../launches/entities/launches.entity';
import { Column, Entity, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'launchpads' })
export class LaunchpadEntity {
  @PrimaryColumn()
  @ApiProperty({ example: '5e9e4501f5090910d4566f83', description: 'ID do lançamento' })
  id: string;

  @Column()
  @ApiProperty({ example: 'VAFB SLC 3W', description: 'Nome do lançamento' })
  name: string;

  @Column()
  @ApiProperty({ example: 'Vandenberg Space Force Base Space Launch Complex 3W', description: 'Nome completo do lançamento' })
  full_name: string;

  @Column()
  @ApiProperty({ example: 'Vandenberg Space Force Base', description: 'Localização do lançamento' })
  locality: string;

  @Column()
  @ApiProperty({ example: 'California', description: 'Região do lançamento' })
  region: string;

  @Column()
  @ApiProperty({ example: 'America/Los_Angeles', description: 'Fuso horário do lançamento' })
  timezone: string;

  @Column('float')
  @ApiProperty({ example: 34.6441, description: 'Latitude do lançamento' })
  latitude: number;

  @Column('float')
  @ApiProperty({ example: -120.593, description: 'Longitude do lançamento' })
  longitude: number;

  @Column()
  @ApiProperty({ example: 0, description: 'Número de tentativas de lançamento' })
  launch_attempts: number;

  @Column()
  @ApiProperty({ example: 0, description: 'Número de lançamentos bem-sucedidos' })
  launch_successes: number;

  @Column('text', { array: true })
  @ApiProperty({ example: ['5e9d0d95eda69955f709d1eb'], description: 'IDs dos foguetes associados ao lançamento' })
  rockets: string[];

  @OneToMany(() => LaunchEntity, launch => launch.launchpad)
  @JoinColumn({ name: 'id' })
  @Column('text', { array: false })
  @ApiProperty({ example: [], description: 'Lançamentos associados ao lançamento' })
  launches: LaunchEntity[];

  @Column()
  @ApiProperty({ example: 'retired', description: 'Status do lançamento' })
  status: string;

  @Column()
  @ApiProperty({ example: "SpaceX's original west coast launch pad for Falcon 1. It was used in a static fire test but was never employed for a launch, and was abandoned due to range scheduling conflicts arising from overflying other active pads.", description: 'Detalhes do lançamento' })
  details: string;
}

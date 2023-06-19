import { Column, Entity, PrimaryColumn, ManyToMany, JoinColumn } from 'typeorm';
import { LaunchEntity } from '../../launches/entities/launches.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'cores' })
export class CoreEntity {
  @PrimaryColumn()
  @ApiProperty({ example: '5e9e289df35918033d3b2623', description: 'ID da core' })
  id: string;

  @Column()
  @ApiProperty({ example: null, description: 'Número do bloco da core' })
  block: number;

  @Column()
  @ApiProperty({ example: 0, description: 'Quantidade de reutilizações da core' })
  reuse_count: number;

  @Column()
  @ApiProperty({ example: 0, description: 'Quantidade de tentativas de pouso na área de retorno para lançamento (RTLS)' })
  rtls_attempts: number;

  @Column()
  @ApiProperty({ example: 0, description: 'Quantidade de pousos bem-sucedidos na área de retorno para lançamento (RTLS)' })
  rtls_landings: number;

  @Column()
  @ApiProperty({ example: 0, description: 'Quantidade de tentativas de pouso na plataforma de pouso no mar (ASDS)' })
  asds_attempts: number;

  @Column()
  @ApiProperty({ example: 0, description: 'Quantidade de pousos bem-sucedidos na plataforma de pouso no mar (ASDS)' })
  asds_landings: number;

  @Column()
  @ApiProperty({ example: 'Engine failure at T+33 seconds resulted in loss of vehicle', description: 'Última atualização da core' })
  last_update: string;

  @ManyToMany(() => LaunchEntity, launch => launch.cores)
  @JoinColumn({ name: 'id' })
  @Column('text', { array: true })
  @ApiProperty({ type: [String], example: ['5eb87cd9ffd86e000604b32a'], description: 'IDs dos lançamentos associados à core' })
  launches: LaunchEntity[];

  @Column()
  @ApiProperty({ example: 'Merlin1A', description: 'Número de série da core' })
  serial: string;

  @Column()
  @ApiProperty({ example: 'lost', description: 'Status atual da core' })
  status: string;
}

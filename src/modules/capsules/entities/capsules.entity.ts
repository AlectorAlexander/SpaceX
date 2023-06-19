import { ApiProperty } from '@nestjs/swagger';
import { LaunchEntity } from '../../launches/entities/launches.entity';
import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'capsules' })
export class CapsulesEntity {
  @PrimaryColumn()
  @ApiProperty({ example: '5e9e2c5bf35918165f3b266a', description: 'O ID da cápsula.' })
  id: string;

  @Column()
  @ApiProperty({ example: 0, description: 'O número de vezes que a cápsula foi reutilizada.' })
  reuse_count: number;

  @Column()
  @ApiProperty({ example: 1, description: 'O número de pousos na água realizados pela cápsula.' })
  water_landings: number;

  @Column()
  @ApiProperty({ example: 0, description: 'O número de pousos em terra realizados pela cápsula.' })
  land_landings: number;

  @Column()
  @ApiProperty({
    example: 'Location and status unknown',
    description: 'A última atualização sobre a localização e o status da cápsula.',
  })
  last_update: string;

  @Column('text', { array: true })
  @ApiProperty({
    example: ['5eb87ce8ffd86e000604b33c'],
    description: 'Uma lista de IDs de lançamentos associados à cápsula.',
  })
  launches: string[];

  @Column()
  @ApiProperty({ example: 'C107', description: 'O número de série da cápsula.' })
  serial: string;

  @Column()
  @ApiProperty({ example: 'unknown', description: 'O status atual da cápsula.' })
  status: string;

  @Column()
  @ApiProperty({ example: 'Dragon 1.1', description: 'O tipo da cápsula.' })
  type: string;

  @OneToOne(() => LaunchEntity, (launch) => launch.capsules)
  @JoinColumn({ name: 'id' })
  launch: LaunchEntity;
}

import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LaunchEntity } from '../../launches/entities/launches.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'rockets' })
export class RocketEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '5e9d0d95eda69955f709d1eb' })
  id: string;

  @Column({ type: 'json' })
  @ApiProperty({
    example: {
      feet: 73,
      meters: 22.25,
    },
    description: 'Contém informações sobre a altura da espaçonave, em metros e pés.',
  })
  height: object;

  @Column({ type: 'json' })
  @ApiProperty({
    example: {
      feet: 5.5,
      meters: 1.68,
    },
    description: 'Contém informações sobre o diâmetro da espaçonave, em metros e pés.',
  })
  diameter: object;

  @Column({ type: 'json' })
  @ApiProperty({
    example: {
      kg: 30146,
      lb: 66460,
    },
    description: 'Contém informações sobre a massa da espaçonave, em quilogramas e libras.',
  })
  mass: object;

  @Column({ type: 'json' })
  @ApiProperty({
    example: {
      engines: 1,
      reusable: false,
      burn_time_sec: 169,
      thrust_vacuum: {
        kN: 480,
        lbf: 110000,
      },
      fuel_amount_tons: 44.3,
      thrust_sea_level: {
        kN: 420,
        lbf: 94000,
      },
    },
    description: 'Contém informações sobre o primeiro estágio da espaçonave, como empuxo, número de motores, quantidade de combustível, etc.',
  })
  first_stage: object;

  @Column({ type: 'json' })
  @ApiProperty({
    example: {
      thrust: {
        kN: 31,
        lbf: 7000,
      },
      engines: 1,
      payloads: {
        option_1: 'composite fairing',
        composite_fairing: {
          height: {
            feet: 11.5,
            meters: 3.5,
          },
          diameter: {
            feet: 4.9,
            meters: 1.5,
          },
        },
      },
      reusable: false,
      burn_time_sec: 378,
      fuel_amount_tons: 3.38,
    },
    description: 'Contém informações sobre o segundo estágio da espaçonave, como empuxo, número de motores, quantidade de combustível, etc.',
  })
  second_stage: object;

  @Column({ type: 'json' })
  @ApiProperty({
    example: {
      isp: {
        vacuum: 304,
        sea_level: 267,
      },
      type: 'merlin',
      layout: 'single',
      number: 1,
      version: '1C',
      propellant_1: 'liquid oxygen',
      propellant_2: 'RP-1 kerosene',
      thrust_vacuum: {
        kN: 480,
        lbf: 110000,
      },
      engine_loss_max: 0,
      thrust_sea_level: {
        kN: 420,
        lbf: 94000,
      },
      thrust_to_weight: 96,
    },
    description: 'Contém informações sobre os motores da espaçonave, como empuxo, tipo de combustível, etc.',
  })
  engines: object;

  @Column({ type: 'json' })
  @ApiProperty({
    example: {
      number: 0,
      material: null,
    },
    description: 'Contém informações sobre as pernas de pouso da espaçonave, como o número de pernas e o material usado.',
  })
  landing_legs: object;

  @Column({ type: 'json', array: true })
  @ApiProperty({
    example: [
      {
        id: 'leo',
        kg: 450,
        lb: 992,
        name: 'Low Earth Orbit',
      },
    ],
    description: 'Contém informações sobre os pesos da carga útil suportados pela espaçonave.',
  })
  payload_weights: object[];

  @Column({ type: 'text', array: true })
  @ApiProperty({
    example: [
      'https://imgur.com/DaCfMsj.jpg',
      'https://imgur.com/azYafd8.jpg',
    ],
    description: 'URLs das imagens da espaçonave disponíveis no Flickr.',
  })
  flickr_images: string[];

  @Column()
  @ApiProperty({ example: 'Falcon 1', description: 'Nome da espaçonave.' })
  name: string;

  @Column()
  @ApiProperty({ example: 'rocket', description: 'Tipo de espaçonave.' })
  type: string;

  @Column()
  @ApiProperty({ example: false, description: 'Indica se a espaçonave está ativa.' })
  active: boolean;

  @Column()
  @ApiProperty({ example: 2, description: 'Número de estágios da espaçonave.' })
  stages: number;

  @Column()
  @ApiProperty({ example: 0, description: 'Número de propulsores da espaçonave.' })
  boosters: number;

  @Column()
  @ApiProperty({ example: 6700000, description: 'Custo por lançamento da espaçonave.' })
  cost_per_launch: number;

  @Column()
  @ApiProperty({ example: 40, description: 'Taxa de sucesso dos lançamentos da espaçonave em porcentagem.' })
  success_rate_pct: number;

  @Column()
  @ApiProperty({ example: '2006-03-24', description: 'Data do primeiro voo da espaçonave.' })
  first_flight: string;

  @Column()
  @ApiProperty({ example: 'Republic of the Marshall Islands', description: 'País de origem da espaçonave.' })
  country: string;

  @Column()
  @ApiProperty({ example: 'SpaceX', description: 'Empresa responsável pela espaçonave.' })
  company: string;

  @Column()
  @ApiProperty({ example: 'https://en.wikipedia.org/wiki/Falcon_1', description: 'URL da página da espaçonave na Wikipedia.' })
  wikipedia: string;

  @Column()
  @ApiProperty({ example: 'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.', description: 'Descrição da espaçonave.' })
  description: string;
}

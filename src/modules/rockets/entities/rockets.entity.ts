import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LaunchEntity } from '../../launches/entities/launches.entity';

@Entity({ name: 'rockets' })
export class RocketEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'json' })
  height: object; /* Contém informações sobre a altura da espaçonave, em metros e pés. */

  @Column({ type: 'json' })
  diameter: object; /* Contém informações sobre o diâmetro da espaçonave, em metros e pés. */

  @Column({ type: 'json' })
  mass: object; /* Contém informações sobre a massa da espaçonave, em quilogramas e libras. */

  @Column({ type: 'json' })
  first_stage: object; /* Contém informações sobre o primeiro estágio da espaçonave, como empuxo, número de motores, quantidade de combustível, etc. */

  @Column({ type: 'json' })
  second_stage: object; /* Contém informações sobre o segundo estágio da espaçonave, como empuxo, número de motores, quantidade de combustível, etc. */

  @Column({ type: 'json' })
  engines: object; /* Contém informações sobre os motores da espaçonave, como empuxo, tipo de combustível, etc. */

  @Column({ type: 'json' })
  landing_legs: object; /* Contém informações sobre as pernas de pouso da espaçonave, como o número de pernas e o material usado. */

  @Column({ type: 'json', array: true })
  payload_weights: object[]; /* Contém informações sobre os pesos da carga útil suportados pela espaçonave. */

  @Column({ type: 'text', array: true })
  flickr_images: string[]; /* URLs das imagens da espaçonave disponíveis no Flickr. */

  @Column()
  name: string; /* Nome da espaçonave. */

  @Column()
  type: string; /* Tipo de espaçonave. */

  @Column()
  active: boolean; /* Indica se a espaçonave está ativa. */

  @Column()
  stages: number; /* Número de estágios da espaçonave. */

  @Column()
  boosters: number; /* Número de propulsores da espaçonave. */

  @Column()
  cost_per_launch: number; /* Custo por lançamento da espaçonave. */

  @Column()
  success_rate_pct: number; /* Taxa de sucesso dos lançamentos da espaçonave em porcentagem. */

  @Column()
  first_flight: string; /* Data do primeiro voo da espaçonave. */

  @Column()
  country: string; /* País de origem da espaçonave. */

  @Column()
  company: string; /* Empresa responsável pela espaçonave. */

  @Column()
  wikipedia: string; /* URL da página da espaçonave na Wikipedia. */

  @Column()
  description: string; /* Descrição da espaçonave. */

}

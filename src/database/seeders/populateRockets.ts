/* import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import axios from 'axios';
import { RocketEntity } from '../..//rockets/entities/rockets.entity';

export default class CreateRockets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/rockets');
      const rockets = response.data;

      const rocketData = rockets.map(rocket => ({
        id: rocket.id,
        height: JSON.stringify(rocket.height),
        diameter: JSON.stringify(rocket.diameter),
        mass: JSON.stringify(rocket.mass),
        first_stage: JSON.stringify(rocket.first_stage),
        second_stage: JSON.stringify(rocket.second_stage),
        engines: JSON.stringify(rocket.engines),
        landing_legs: JSON.stringify(rocket.landing_legs),
        payload_weights: JSON.stringify(rocket.payload_weights),
        flickr_images: JSON.stringify(rocket.flickr_images),
        name: rocket.name,
        type: rocket.type,
        active: rocket.active,
        stages: rocket.stages,
        boosters: rocket.boosters,
        cost_per_launch: rocket.cost_per_launch,
        success_rate_pct: rocket.success_rate_pct,
        first_flight: rocket.first_flight,
        country: rocket.country,
        company: rocket.company,
        wikipedia: rocket.wikipedia,
        description: rocket.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await connection.getRepository(RocketEntity).save(rocketData);
    } catch (error) {
      console.error('Erro ao obter dados dos rockets:', error);
    }
  }
}
 */
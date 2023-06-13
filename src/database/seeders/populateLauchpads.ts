/* import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import axios from 'axios';
import { LaunchpadEntity } from '../..//launchpads/entities/launchpads.entity';

export default class CreateLaunchpads implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/launchpads');
      const launchpads = response.data;

      const launchpadData = launchpads.map(launchpad => ({
        id: launchpad.id,
        name: launchpad.name,
        full_name: launchpad.full_name,
        status: launchpad.status,
        locality: launchpad.locality,
        region: launchpad.region,
        timezone: launchpad.timezone,
        latitude: launchpad.latitude,
        longitude: launchpad.longitude,
        rockets: JSON.stringify(launchpad.rockets),
        details: launchpad.details,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await connection.getRepository(LaunchpadEntity).save(launchpadData);
    } catch (error) {
      console.error('Erro ao obter dados dos launchpads:', error);
      return Promise.reject(error);
    }
  }
}
 */
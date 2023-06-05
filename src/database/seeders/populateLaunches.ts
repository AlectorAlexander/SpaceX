import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import axios from 'axios';
import { LaunchEntity } from 'src/modules/launches/entities/launches.entity';

export default class CreateLaunches implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/launches');
      const launches = response.data;

      const launchData = launches.map(launch => ({
        id: launch.id,
        links: JSON.stringify(launch.links),
        reddit: JSON.stringify(launch.reddit),
        flickr: JSON.stringify(launch.flickr),
        tdb: launch.tdb,
        net: launch.net,
        window: launch.window,
        rocket: launch.rocket,
        success: launch.success,
        failures: JSON.stringify(launch.failures),
        details: launch.details,
        crew: JSON.stringify(launch.crew),
        cores: launch.cores.length > 0 ? JSON.stringify(launch.cores) : null,
        ships: JSON.stringify(launch.ships),
        capsules: JSON.stringify(launch.capsules),
        payloads: JSON.stringify(launch.payloads),
        launchpad: launch.launchpad,
        upcoming: launch.upcoming,
        auto_update: launch.auto_update,
        name: launch.name,
        date_utc: launch.date_utc,
        date_unix: launch.date_unix,
        date_local: launch.date_local,
        date_tbd: launch.date_tbd,
        date_tbd_window: launch.date_tbd_window,
        date_precision: launch.date_precision,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }));

      await connection.getRepository(LaunchEntity).save(launchData);
    } catch (error) {
      console.error('Erro ao obter dados dos lançamentos:', error);
      return Promise.reject(error);
    }
  }
}

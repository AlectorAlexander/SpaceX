/* import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import axios from 'axios';
import { CoreEntity } from '../..//cores/entities/cores.entity';

export default class CoreSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/cores');
      const cores = response.data;

      const coreData = cores.map((core) => {
        return {
          block: core.block,
          reuse_count: core.reuse_count,
          rtls_attempts: core.rtls_attempts,
          rtls_landings: core.rtls_landings,
          asds_attempts: core.asds_attempts,
          asds_landings: core.asds_landings,
          last_update: core.last_update,
          launches: core.launches.length > 0 ? JSON.stringify(core.launches) : null,
          serial: core.serial,
          status: core.status,
          id: core.id,
        };
      });

      await connection.getRepository(CoreEntity).createQueryBuilder().insert().values(coreData).execute();
    } catch (error) {
      console.error('Erro ao obter dados dos cores:', error);
    }
  }
}
 */
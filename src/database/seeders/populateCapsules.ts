/* import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import axios from 'axios';
import { CapsulesEntity } from '../..//capsules/entities/capsules.entity';

export default class CreateCapsules implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const response = await axios.get('https://api.spacexdata.com/v4/capsules');
    const capsules = response.data;

    const capsuleData = capsules.map((capsule) => {
      const lastUpdate = capsule.last_update && capsule.last_update.replace(/"/g, '');
      const launches = capsule.launches && JSON.stringify(capsule.launches);

      return {
        reuse_count: capsule.reuse_count,
        water_landings: capsule.water_landings,
        land_landings: capsule.land_landings,
        last_update: lastUpdate,
        launches,
        serial: capsule.serial,
        status: capsule.status,
        type: capsule.type,
        id: capsule.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await connection.getRepository(CapsulesEntity).createQueryBuilder().insert().values(capsuleData).execute();
  }
}
 */
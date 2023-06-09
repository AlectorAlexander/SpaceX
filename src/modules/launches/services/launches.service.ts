import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { LaunchEntity } from '../entities/launches.entity';
import { LaunchpadService } from '../..//launchpads/services/launchpads.service';
import { log } from 'console';

@Injectable()
export class LaunchService {
  constructor(
    @InjectRepository(LaunchEntity)
    private readonly launchRepository: Repository<LaunchEntity>,
    private readonly launchpadService: LaunchpadService,
  ) {

  }

  public async getAllLaunches(): Promise<LaunchEntity[]> {
    const launches = await this.launchRepository.find();
    return launches;
  }

  public async getLaunchById(id: string): Promise<LaunchEntity | null> {
    
    const launch = await this.launchRepository.findOne({ where: {id}});
    return launch;
  }

  public async getRocketPending(): Promise<LaunchEntity | null> {
    const launch = await this.launchRepository.findOne({
      where: { upcoming: true },
      order: { dateUnix: 'ASC' },
    });
    return launch || null;
  }

  public async getRocketsSuccess(): Promise<LaunchEntity[] | null> {
    const launches = await this.launchRepository.find({
      where: { success: true },
      order: { dateUnix: 'ASC' },
    });
    return launches || null;
  }

  public async getRocketsFailure(): Promise<LaunchEntity[] | null> {
    const launches = await this.launchRepository.find({
      where: { success: false },
      order: { dateUnix: 'ASC' },
    });
    return launches || null;
  }

  public async getLaunchesByCapsuleId(capsuleId: string): Promise<LaunchEntity[] | null> {
    try {
      const launches = await this.launchRepository.find({
        where: { capsules: ILike(`%${capsuleId}%`) },
        order: { dateUnix: 'ASC' },
      });
      return launches || null;
    } catch (error) {
      console.error('Error in getLaunchesByCapsuleId:', error);
      return null;
    }
  }

  public async getLaunchesByPayloadId(payloadId: string): Promise<LaunchEntity[] | null> {
    try {
      const launches = await this.launchRepository.find({
        where: { payloads: ILike(`%${payloadId}%`) },
        order: { dateUnix: 'ASC' },
      });
      return launches || null;
    } catch (error) {
      console.error('Error in getLaunchesByPayloadId:', error);
      return null;
    }
  }

  public async getLaunchesByLaunchpadId(launchpadId: string): Promise<LaunchEntity[] | null> {
    try {
      const launches = await this.launchRepository.find({
        where: { launchpad: ILike(`%${launchpadId}%`) },
        order: { dateUnix: 'ASC' },
      });
      return launches || null;
    } catch (error) {
      console.error('Error in getLaunchesByLaunchpadId:', error);
      return null;
    }
  }

  public async getLaunchesByRocketId(rocketId: string): Promise<LaunchEntity[] | null> {
      const launches = await this.launchRepository.find({
        where: { rocket: ILike(`%${rocketId}%`) },
        order: { dateUnix: 'ASC' },
      });
      return launches || null;
  }

  public async getLaunchesByLaunchpadName(launchpadName: string): Promise<LaunchEntity[]> {
    const launchpads = await this.launchpadService.getLaunchpadByName(launchpadName);
  
    if (!launchpads || launchpads.length === 0) {
      throw new NotFoundException('Launchpad not found');
    }
    const launchpadIds = launchpads.map((launchpad) => launchpad.id);
    const launches: (LaunchEntity[] | null)[] = await Promise.all(
      launchpadIds.map((launchpadId) => this.getLaunchesByLaunchpadId(launchpadId)),
    );
    return launches.flat().filter((launch) => launch !== null) as LaunchEntity[];
  }
  

  public async getLaunchesByCoreId(coreId: string): Promise<LaunchEntity[] | null> {
    try {
      const launches = await this.launchRepository.find();
      const filteredLaunches = launches.filter((launch) =>
        launch.cores.filter((core) => {
          if (core.core) 
          return core.core === coreId
        }),
      );
      return filteredLaunches || null;
    } catch (error) {
      console.error('Error in getLaunchesByCoreId:', error);
      return null;
    }
  }

  public async getLaunchesByTimePeriod(
    startYear: number,
    endYear: number,
  ): Promise<LaunchEntity[] | null> {
    const launches = await this.launchRepository.find();

    const filteredLaunches = launches.filter((launch) => {
      const launchYear = new Date(launch.dateUnix * 1000).getFullYear();
      return launchYear >= startYear && launchYear <= endYear;
    });

    return filteredLaunches;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not, IsNull } from 'typeorm';
import { MoreThan } from 'typeorm';
import { RocketEntity } from '../entities/rockets.entity';
import { LaunchService } from 'src/modules/launches/services/launches.service';

@Injectable()
export class RocketsService {
  constructor(
    @InjectRepository(RocketEntity)
    private readonly rocketRepository: Repository<RocketEntity>,
    private readonly launchService: LaunchService,
  ) {}

  public async getAllRockets(): Promise<RocketEntity[]> {
    const rockets = await this.rocketRepository.find();
    return rockets;
  }

  public async getRocketById(id: string): Promise<RocketEntity | null> {
    const rocket = await this.rocketRepository.findOne({where: {id}});
    return rocket;
  }

  public async getRocketByName(name: string): Promise<RocketEntity[] | null> {
    try {
      const rockets = await this.rocketRepository.find({
        where: {
          name: Like(`%${name}%`),
        },
      });

      return rockets.length > 0 ? rockets : null;
    } catch (error) {
      console.error(`Error retrieving rockets by name: ${error}`);
      return null;
    }
  }

  public async getRocketByCompany(company: string): Promise<RocketEntity[] | null> {
    try {
      const rockets = await this.rocketRepository.find({
        where: {
          company: Like(`%${company}%`),
        },
      });

      return rockets.length > 0 ? rockets : null;
    } catch (error) {
      console.error(`Error retrieving rockets by company: ${error}`);
      return null;
    }
  }

  public async getRocketByCountry(country: string): Promise<RocketEntity[] | null> {
    try {
      const rockets = await this.rocketRepository.find({
        where: {
          country: Like(`%${country}%`),
        },
      });

      return rockets.length > 0 ? rockets : null;
    } catch (error) {
      console.error(`Error retrieving rockets by country: ${error}`);
      return null;
    }
  }

  public async getRocketPending(): Promise<RocketEntity | null> {
    try {
      const launch = await this.launchService.getRocketPending();
  
      if (!launch) {
        return null;
      }
  
      const rocket = await this.rocketRepository.findOne({ where: { id: launch.rocket } });
  
      return rocket || null;
    } catch (error) {
      console.error(`Error retrieving pending rocket: ${error}`);
      return null;
    }
  }
  
  
  
  
  
  

  public async getRocketsSuccess(): Promise<RocketEntity[] | null> {
    try {
      const launch = await this.launchService.getRocketsSuccess();

      if (!launch || launch.length === 0) {
        return null;
      }

      const rocketIds = launch.map((launch) => launch.rocket);
      const rockets = await this.rocketRepository.findByIds(rocketIds);
      return rockets;
    } catch (error) {
      console.error(`Error retrieving rockets with success: ${error}`);
      return null;
    }
  }

  public async getRocketsFailure(): Promise<RocketEntity[] | null> {
    try {
      const launch = await this.launchService.getRocketsFailure();

      if (!launch) {
        return null;
      }

      const rocketIds = launch.map((launch) => launch.rocket);
      const rockets = await this.rocketRepository.findByIds(rocketIds);
      return rockets;
    } catch (error) {
      console.error(`Error retrieving rockets with failure: ${error}`);
      return null;
    }
  }

  public async getActiveRocket(): Promise<RocketEntity[] | null> {
    try {
      const rockets = await this.rocketRepository.find({
        where: {
          active: true,
        },
      });

      return rockets;
    } catch (error) {
      console.error('Error in getActiveRocket:', error);
      return null;
    }
  }

  public async getFalconRockets(): Promise<RocketEntity[] | null> {
    try {
      const rockets = await this.rocketRepository.find({
        where: {
          type: 'rocket',
          name: Like('%Falcon%'),
        },
      });

      return rockets;
    } catch (error) {
      console.error('Error in getFalconRockets:', error);
      return null;
    }
  }

  public async getHighSuccessRateRockets(): Promise<RocketEntity[] | null> {
    try {
      const rockets = await this.rocketRepository.find({
        where: {
          success_rate_pct: MoreThan(90),
        },
      });

      return rockets;
    } catch (error) {
      console.error('Error in getHighSuccessRateRockets:', error);
      return null;
    }
  }

  public async getRocketsWithImages(): Promise<RocketEntity[] | null> {
    try {
      const rockets = await this.rocketRepository.find({
        where: {
          flickr_images: Not(IsNull()),
        },
      });

      return rockets;
    } catch (error) {
      console.error('Error in getRocketsWithImages:', error);
      return null;
    }
  }

  public async getRocketsLaunchedAfterDate(date: string): Promise<RocketEntity[] | null> {
    try {
      const rockets = await this.rocketRepository.find({
        where: {
          first_flight: MoreThan(date),
        },
      });

      return rockets;
    } catch (error) {
      console.error('Error in getRocketsLaunchedAfterDate:', error);
      return null;
    }
  }
}

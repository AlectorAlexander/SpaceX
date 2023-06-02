import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { LaunchpadEntity } from '../entities/launchpads.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LaunchpadService {
  constructor(
    @InjectRepository(LaunchpadEntity)
    private readonly launchpadRepository: Repository<LaunchpadEntity>,
  ) {}

  public async getAllLaunchpads(): Promise<LaunchpadEntity[]> {
    const launchpads = await this.launchpadRepository.find();
    return launchpads;
  }

  public async getLaunchpadById(id: string): Promise<LaunchpadEntity | null> {
    const launchpad = await this.launchpadRepository.findOne({ where: {id}});
    return launchpad || null;
  }

  public async getLaunchpadByName(name: string): Promise<LaunchpadEntity[] | null> {
    try {
      const launchpads = await this.launchpadRepository.find({
        where: {
          name: Like(`%${name}%`),
        },
      });
      return launchpads;
    } catch (error) {
      console.error('Error in getLaunchpadByName:', error);
      return null;
    }
  }

  public async getLaunchpadByLocality(locality: string): Promise<LaunchpadEntity[] | null> {
    try {
      const launchpads = await this.launchpadRepository.find({
        where: {
          locality: Like(`%${locality}%`),
        },
      });
      return launchpads;
    } catch (error) {
      console.error('Error in getLaunchpadByLocality:', error);
      return null;
    }
  }

  public async getLaunchpadByRegion(region: string): Promise<LaunchpadEntity[] | null> {
    try {
      const launchpads = await this.launchpadRepository.find({
        where: {
          region: Like(`%${region}%`),
        },
      });
      return launchpads;
    } catch (error) {
      console.error('Error in getLaunchpadByRegion:', error);
      return null;
    }
  }
}

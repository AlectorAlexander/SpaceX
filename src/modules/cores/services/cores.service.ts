import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreEntity } from '../entities/cores.entity';

@Injectable()
export class CoresService {
  constructor(
    @InjectRepository(CoreEntity)
    private readonly coresRepository: Repository<CoreEntity>,
  ) {}

  public async getAllCores(): Promise<CoreEntity[]> {
    const cores = await this.coresRepository.find();
    return cores;
  }

  public async getCoreById(id: string): Promise<CoreEntity | null> {
    const core = await this.coresRepository.findOne({where: {id}});
    return core;
  }

  public async getCoresByTimesUsed(): Promise<CoreEntity[] | null> {
    try {
      const cores = await this.coresRepository.find({
        order: { reuse_count: 'DESC' },
      });
      return cores;
    } catch (error) {
      console.error('Error in getCoresByTimesUsed:', error);
      return null;
    }
  }

  public async getLaunchesByRtlsLandings(): Promise<CoreEntity[] | null> {
    try {
      const cores = await this.coresRepository.find({
        order: { rtls_landings: 'DESC' },
      });
      return cores;
    } catch (error) {
      console.error('Error in getLaunchesByRtlsLandings:', error);
      return null;
    }
  }

  public async getLaunchesByAsdsAttempts(): Promise<CoreEntity[] | null> {
    try {
      const cores = await this.coresRepository.find({
        order: { asds_attempts: 'DESC' },
      });
      return cores;
    } catch (error) {
      console.error('Error in getLaunchesByAsdsAttempts:', error);
      return null;
    }
  }

  public async getLaunchesByAsdsLandings(): Promise<CoreEntity[] | null> {
    try {
      const cores = await this.coresRepository.find({
        order: { asds_landings: 'DESC' },
      });
      return cores;
    } catch (error) {
      console.error('Error in getLaunchesByAsdsLandings:', error);
      return null;
    }
  }
}

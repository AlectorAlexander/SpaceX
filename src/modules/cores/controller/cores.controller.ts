import { Controller, Get, Param } from '@nestjs/common';
import { CoresService } from '../services/cores.service';

@Controller('cores')
class CoresController {
  constructor(private coresService: CoresService) {}

  @Get()
  public async getAllCores(): Promise<any> {
    try {
      const cores = await this.coresService.getAllCores();
      return cores;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch cores');
    }
  }

  @Get(':id')
  public async getCoreById(@Param('id') id: string): Promise<any> {
    try {
      const core = await this.coresService.getCoreById(id);
      if (core) {
        return core;
      } else {
        throw new Error('Core not found');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch core');
    }
  }

  @Get('rtls-landings')
  public async getLaunchesByRtlsLandings(): Promise<any> {
    try {
      const cores = await this.coresService.getLaunchesByRtlsLandings();
      if (cores) {
        return cores;
      } else {
        throw new Error('Core not found');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch launches');
    }
  }

  @Get('asds-attempts')
  public async getLaunchesByAsdsAttempts(): Promise<any> {
    try {
      const cores = await this.coresService.getLaunchesByAsdsAttempts();
      if (cores) {
        return cores;
      } else {
        throw new Error('Core not found');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch launches');
    }
  }

  @Get('asds-landings')
  public async getLaunchesByAsdsLandings(): Promise<any> {
    try {
      const cores = await this.coresService.getLaunchesByAsdsLandings();
      if (cores) {
        return cores;
      } else {
        throw new Error('Core not found');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch launches');
    }
  }
}

export default CoresController;

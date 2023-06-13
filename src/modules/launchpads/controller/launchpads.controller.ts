import { Controller, Get, Param, Res, HttpStatus, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { LaunchpadService } from '../services/launchpads.service';

@Controller('launchpads')
class LaunchpadsController {
  constructor(private launchpadService: LaunchpadService) {}

  @Get()
  public async getAllLaunchpads(@Res() res: Response): Promise<void> {
    try {
      const launchpads = await this.launchpadService.getAllLaunchpads();
      res.json(launchpads);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch launchpads');
    }
  }

  @Get('name/:name')
  public async getLaunchpadByName(@Param('name') name: string, @Res() res: Response): Promise<void> {
    try {
      const launchpad = await this.launchpadService.getLaunchpadByName(name);
      if (launchpad) {
        res.status(HttpStatus.OK).json(launchpad);
      } else {
        throw new NotFoundException(`Launchpad with name ${name} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('locality/:locality')
  public async getLaunchpadByLocality(@Param('locality') locality: string, @Res() res: Response): Promise<void> {
    try {
      const launchpad = await this.launchpadService.getLaunchpadByLocality(locality);
      if (launchpad) {
        res.status(HttpStatus.OK).json(launchpad);
      } else {
        throw new NotFoundException(`Launchpad with locality ${locality} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('region/:region')
  public async getLaunchpadByRegion(@Param('region') region: string, @Res() res: Response): Promise<void> {
    try {
      const launchpad = await this.launchpadService.getLaunchpadByRegion(region);
      if (launchpad) {
        res.status(HttpStatus.OK).json(launchpad);
      } else {
        throw new NotFoundException(`Launchpad with region ${region} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  public async getLaunchpadById(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const launchpad = await this.launchpadService.getLaunchpadById(id);
      if (launchpad) {
        res.json(launchpad);
      } else {
        throw new NotFoundException('Launchpad not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launchpad');
    }
  }
}

export default LaunchpadsController;

import { LaunchpadEntity } from '../entities/launchpads.entity';
import { Controller, Get, Param, Res, HttpStatus, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { LaunchpadService } from '../services/launchpads.service';

@Controller('launchpads')
class LaunchpadsController {
  constructor(private readonly launchpadService: LaunchpadService) {}

  @Get()
  public async getAllLaunchpads(@Res() res: Response): Promise<void> {
    const launchpads = await this.launchpadService.getAllLaunchpads();
    if (!launchpads || launchpads.length === 0) {
      throw new NotFoundException('No launchpads found');
    }
    res.status(HttpStatus.OK).json(launchpads);
  }

  @Get('name/:name')
  public async getLaunchpadByName(@Param('name') name: string): Promise<LaunchpadEntity[]> {
    const launchpad = await this.launchpadService.getLaunchpadByName(name);
    if (!launchpad || launchpad.length === 0) {
      throw new NotFoundException(`Launchpad with name ${name} not found`);
    }
    return launchpad;
  }

  @Get('locality/:locality')
  public async getLaunchpadByLocality(@Param('locality') locality: string, @Res() res: Response): Promise<void> {
    const launchpad = await this.launchpadService.getLaunchpadByLocality(locality);
    if (!launchpad) {
      throw new NotFoundException(`Launchpad with locality ${locality} not found`);
    }
    res.status(HttpStatus.OK).json(launchpad);
  }

  @Get('region/:region')
  public async getLaunchpadByRegion(@Param('region') region: string, @Res() res: Response): Promise<void> {
    const launchpad = await this.launchpadService.getLaunchpadByRegion(region);
    if (!launchpad) {
      throw new NotFoundException(`Launchpad with region ${region} not found`);
    }
    res.status(HttpStatus.OK).json(launchpad);
  }

  @Get(':id')
  public async getLaunchpadById(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const launchpad = await this.launchpadService.getLaunchpadById(id);
    if (!launchpad) {
      throw new NotFoundException('Launchpad not found');
    }
    res.json(launchpad);
  }
}

export default LaunchpadsController;

import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { RocketsService } from '../services/rockets.service';
import { RocketEntity } from '../entities/rockets.entity';

@Controller('rockets')
export class RocketsController {
  constructor(private readonly rocketsService: RocketsService) {}

  @Get()
  async getAllRockets(): Promise<RocketEntity[]> {
    return this.rocketsService.getAllRockets();
  }

  @Get(':id')
  async getRocketById(@Param('id') id: string): Promise<RocketEntity> {
    const rocket = await this.rocketsService.getRocketById(id);
    if (!rocket) {
      throw new NotFoundException('Rocket not found');
    }
    return rocket;
  }

  @Get('pending')
  async getNextRocketPending(): Promise<RocketEntity> {
    const rocket = await this.rocketsService.getRocketPending();
    if (!rocket) {
      throw new NotFoundException('No pending rocket found');
    }
    return rocket;
  }

  @Get('name/:name')
  async getRocketByName(@Param('name') name: string): Promise<RocketEntity[]> {
    const rocket = await this.rocketsService.getRocketByName(name);
    if (!rocket) {
      throw new NotFoundException('Rocket not found');
    }
    return rocket;
  }

  @Get('company/:company')
  async getRocketByCompany(@Param('company') company: string): Promise<RocketEntity[]> {
    const rocket = await this.rocketsService.getRocketByCompany(company);
    if (!rocket) {
      throw new NotFoundException('Rocket not found');
    }
    return rocket;
  }

  @Get('country/:country')
  async getRocketByCountry(@Param('country') country: string): Promise<RocketEntity[]> {
    const rocket = await this.rocketsService.getRocketByCountry(country);
    if (!rocket) {
      throw new NotFoundException('Rocket not found');
    }
    return rocket;
  }

  @Get('success')
  async getRocketsSuccess(): Promise<RocketEntity[]> {
    const rockets = await this.rocketsService.getRocketsSuccess();
    if (!rockets || rockets.length === 0) {
      throw new NotFoundException('No rockets found');
    }
    return rockets;
  }

  @Get('failure')
  async getRocketsFailure(): Promise<RocketEntity[]> {
    const rockets = await this.rocketsService.getRocketsFailure();
    if (!rockets || rockets.length === 0) {
      throw new NotFoundException('No rockets found');
    }
    return rockets;
  }

  @Get('active')
  async getActiveRocket(): Promise<RocketEntity[]> {
    const rocket = await this.rocketsService.getActiveRocket();
    if (!rocket) {
      throw new NotFoundException('Rocket not found');
    }
    return rocket;
  }

  @Get('falcon')
  async getFalconRockets(): Promise<RocketEntity[]> {
    const rockets = await this.rocketsService.getFalconRockets();
    if (!rockets || rockets.length === 0) {
      throw new NotFoundException('No rockets found');
    }
    return rockets;
  }

  @Get('high-success-rate')
  async getHighSuccessRateRockets(): Promise<RocketEntity[]> {
    const rockets = await this.rocketsService.getHighSuccessRateRockets();
    if (!rockets || rockets.length === 0) {
      throw new NotFoundException('No rockets found');
    }
    return rockets;
  }

  @Get('with-images')
  async getRocketsWithImages(): Promise<RocketEntity[]> {
    const rockets = await this.rocketsService.getRocketsWithImages();
    if (!rockets || rockets.length === 0) {
      throw new NotFoundException('No rockets found');
    }
    return rockets;
  }

  @Get('launched-after/:date')
  async getRocketsLaunchedAfterDate(@Param('date') date: string): Promise<RocketEntity[]> {
    const rockets = await this.rocketsService.getRocketsLaunchedAfterDate(date);
    if (!rockets || rockets.length === 0) {
      throw new NotFoundException('No rockets found');
    }
    return rockets;
  }
}

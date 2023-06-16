import { Controller, Get, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RocketsService } from '../services/rockets.service';
import { RocketEntity } from '../entities/rockets.entity';

@Controller('rockets')
export class RocketsController {
  constructor(private readonly rocketsService: RocketsService) {}

  @Get()
  async getAllRockets(): Promise<RocketEntity[]> {
    try {
      return await this.rocketsService.getAllRockets();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('pending')
  async getNextRocketPending(): Promise<RocketEntity> {
    try {
      const rocket = await this.rocketsService.getRocketPending();
      if (!rocket) {
        throw new NotFoundException('No pending rocket found');
      }
      return rocket;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('name/:name')
  async getRocketByName(@Param('name') name: string): Promise<RocketEntity[]> {
    try {
      const rocket = await this.rocketsService.getRocketByName(name);
      if (!rocket) {
        throw new NotFoundException('Rocket not found');
      }
      return rocket;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('company/:company')
  async getRocketByCompany(@Param('company') company: string): Promise<RocketEntity[]> {
    try {
      const rocket = await this.rocketsService.getRocketByCompany(company);
      if (!rocket) {
        throw new NotFoundException('Rocket not found');
      }
      return rocket;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('country/:country')
  async getRocketByCountry(@Param('country') country: string): Promise<RocketEntity[]> {
    try {
      const countryName = country.replace(/_/g, ' ').toUpperCase();
      const rocket = await this.rocketsService.getRocketByCountry(countryName);
      if (!rocket) {
        throw new NotFoundException('Rocket not found');
      }
      return rocket;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('success')
  async getRocketsSuccess(): Promise<RocketEntity[]> {
    try {
      const rockets = await this.rocketsService.getRocketsSuccess();
      if (!rockets || rockets.length === 0) {
        throw new NotFoundException('No rockets found');
      }
      return rockets;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('failure')
  async getRocketsFailure(): Promise<RocketEntity[]> {
    try {
      const rockets = await this.rocketsService.getRocketsFailure();
      if (!rockets || rockets.length === 0) {
        throw new NotFoundException('No rockets found');
      }
      return rockets;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('active')
  async getActiveRocket(): Promise<RocketEntity[]> {
    try {
      const rocket = await this.rocketsService.getActiveRocket();
      if (!rocket) {
        throw new NotFoundException('Rocket not found');
      }
      return rocket;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('falcon')
  async getFalconRockets(): Promise<RocketEntity[]> {
    try {
      const rockets = await this.rocketsService.getFalconRockets();
      if (!rockets || rockets.length === 0) {
        throw new NotFoundException('No rockets found');
      }
      return rockets;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('high-success-rate')
  async getHighSuccessRateRockets(): Promise<RocketEntity[]> {
    try {
      const rockets = await this.rocketsService.getHighSuccessRateRockets();
      if (!rockets || rockets.length === 0) {
        throw new NotFoundException('No rockets found');
      }
      return rockets;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('with-images')
  async getRocketsWithImages(): Promise<RocketEntity[]> {
    try {
      const rockets = await this.rocketsService.getRocketsWithImages();
      if (!rockets || rockets.length === 0) {
        throw new NotFoundException('No rockets found');
      }
      return rockets;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('launched-after/:date')
  async getRocketsLaunchedAfterDate(@Param('date') date: string): Promise<RocketEntity[]> {
    try {
      const rockets = await this.rocketsService.getRocketsLaunchedAfterDate(date);
      if (!rockets || rockets.length === 0) {
        throw new NotFoundException('No rockets found');
      }
      return rockets;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async getRocketById(@Param('id') id: string): Promise<RocketEntity> {
    try {
      const rocket = await this.rocketsService.getRocketById(id);
      if (!rocket) {
        throw new NotFoundException('Rocket not found');
      }
      return rocket;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

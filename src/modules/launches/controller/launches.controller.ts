import { Controller, Get, Param, Post, Body, Next, Res, HttpStatus, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { LaunchService } from '../services/launches.service';
import { LaunchEntity } from '../entities/launches.entity';

@Controller('launches')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  @Get()
  public async getAllLaunches(): Promise<LaunchEntity[]> {
    try {
      return this.launchService.getAllLaunches();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('success')
  public async getLaunchesSuccess(@Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getRocketsSuccess();
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        throw new NotFoundException('Launches not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launches');
    }
  }

  @Get('failure')
  public async getLaunchesFailure(@Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getRocketsFailure();
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        throw new NotFoundException('Launches not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launches');
    }
  }

  @Post('search/time')
  public async getLaunchesByTimePeriod(
    @Body('start_date') startDate: number,
    @Body('end_date') endDate: number,
    @Res() res,
    @Next() next
  ): Promise<void> {
    try {
      if (isNaN(startDate) || isNaN(endDate)) {
        throw new BadRequestException('Invalid date format');
      }

      const launches = await this.launchService.getLaunchesByTimePeriod(startDate, endDate);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        throw new NotFoundException('Launches not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launches');
    }
  }

  @Get('capsule/:id')
  public async getLaunchesByCapsuleId(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getLaunchesByCapsuleId(id);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        throw new NotFoundException('Launches not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launches');
    }
  }

  @Get('payload/:id')
  public async getLaunchesByPayloadId(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getLaunchesByPayloadId(id);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        throw new NotFoundException('Launches not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launches');
    }
  }

  @Get('launchpad/:id')
  public async getLaunchesByLaunchpadId(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getLaunchesByLaunchpadId(id);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        throw new NotFoundException('Launches not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launches');
    }
  }

  @Get('launchpad/name/:name')
  public async getLaunchesByLaunchpadName(@Param('name') name: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launchpadName = name.replace(/_/g, ' ').toUpperCase();
      const launches = await this.launchService.getLaunchesByLaunchpadName(launchpadName);
      if (launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        throw new NotFoundException('Launches not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launches');
    }
  }

  @Get('rocket/:id')
  public async getLaunchesByRocketId(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getLaunchesByRocketId(id);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        throw new NotFoundException('Launches not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launches');
    }
  }

  @Get('core/:id')
  public async getLaunchesByCoreId(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getLaunchesByCoreId(id);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        throw new NotFoundException('Launches not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launches');
    }
  }

  @Get(':id')
  public async getLaunchById(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launch = await this.launchService.getLaunchById(id);
      if (launch) {
        res.status(HttpStatus.OK).json(launch);
      } else {
        throw new NotFoundException('Launch not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch launch');
    }
  }
}

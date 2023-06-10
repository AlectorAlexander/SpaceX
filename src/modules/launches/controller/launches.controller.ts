import { Controller, Get, Param, Post, Body, Next, Res, HttpStatus } from '@nestjs/common';
import { LaunchService } from '../services/launches.service';
import { LaunchEntity } from '../entities/launches.entity';

@Controller('launches')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}
  
  @Get()
  public async getAllLaunches(): Promise<LaunchEntity[]> {
    return this.launchService.getAllLaunches();
  }

  @Get(':id')
  public async getLaunchById(@Param('id') id: string): Promise<LaunchEntity | null> {
    return this.launchService.getLaunchById(id);
  }

  @Get('success')
  public async getLaunchesSuccess(@Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getRocketsSuccess();
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Launches not found';
        next({ status, message });
      }
    } catch (error) {
      const message = 'Failed to fetch launches';
      next({ message, error });
    }
  }

  @Get('failure')
  public async getLaunchesFailure(@Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getRocketsFailure();
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Launches not found';
        next({ status, message });
      }
    } catch (error) {
      const message = 'Failed to fetch launches';
      next({ message, error });
    }
  }

  @Get('capsule/:id')
  public async getLaunchesByCapsuleId(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getLaunchesByCapsuleId(id);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Launches not found';
        next({ status, message });
      }
    } catch (error) {
      const message = 'Failed to fetch launches';
      next({ message, error });
    }
  }

  @Get('payload/:id')
  public async getLaunchesByPayloadId(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getLaunchesByPayloadId(id);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Launches not found';
        next({ status, message });
      }
    } catch (error) {
      const message = 'Failed to fetch launches';
      next({ message, error });
    }
  }

  @Get('launchpad/:id')
  public async getLaunchesByLaunchpadId(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getLaunchesByLaunchpadId(id);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Launches not found';
        next({ status, message });
      }
    } catch (error) {
      const message = 'Failed to fetch launches';
      next({ message, error });
    }
  }

  @Get('launchpad/name/:name')
  public async getLaunchesByLaunchpadName(@Param('name') name: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launchpadName = name.replace(/_/g, ' ').toUpperCase();
      const launches = await this.launchService.getLaunchesByLaunchpadName(launchpadName);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Launches not found';
        next({ status, message });
      }
    } catch (error) {
      const message = 'Failed to fetch launches';
      next({ message, error });
    }
  }

  @Get('rocket/:id')
  public async getLaunchesByRocketId(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getLaunchesByRocketId(id);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Launches not found';
        next({ status, message });
      }
    } catch (error) {
      const message = 'Failed to fetch launches';
      next({ message, error });
    }
  }

  @Get('core/:id')
  public async getLaunchesByCoreId(@Param('id') id: string, @Res() res, @Next() next): Promise<void> {
    try {
      const launches = await this.launchService.getLaunchesByCoreId(id);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Launches not found';
        next({ status, message });
      }
    } catch (error) {
      const message = 'Failed to fetch launches';
      next({ message, error });
    }
  }

  @Post('time-period')
  public async getLaunchesByTimePeriod(
    @Body('start_date') startDate: string,
    @Body('end_date') endDate: string,
    @Res() res,
    @Next() next
  ): Promise<void> {
    try {
      const startTimestamp = Date.parse(startDate);
      const endTimestamp = Date.parse(endDate);
  
      if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
        const status = HttpStatus.BAD_REQUEST;
        const message = 'Invalid date format';
        next({ status, message });
        return;
      }
  
      const launches = await this.launchService.getLaunchesByTimePeriod(startTimestamp, endTimestamp);
      if (launches && launches.length > 0) {
        res.status(HttpStatus.OK).json(launches);
      } else {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Launches not found';
        next({ status, message });
      }
    } catch (error) {
      const message = 'Failed to fetch launches';
      next({ message, error });
    }
  }
  
}

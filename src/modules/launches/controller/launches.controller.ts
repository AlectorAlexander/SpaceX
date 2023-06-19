import { Controller, Get, Param, Post, Body, Next, Res, HttpStatus, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { LaunchService } from '../services/launches.service';
import { LaunchEntity } from '../entities/launches.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('launches')
@Controller('launches')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os lançamentos' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: LaunchEntity, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
  public async getAllLaunches(): Promise<LaunchEntity[]> {
    try {
      return this.launchService.getAllLaunches();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('success')
  @ApiOperation({ summary: 'Obter lançamentos com sucesso' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: LaunchEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Obter lançamentos com falha' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: LaunchEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Pesquisar lançamentos por período de tempo' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: LaunchEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiBadRequestResponse({ description: 'Formato de data inválido' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Obter lançamentos por ID da cápsula' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID da cápsula' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: LaunchEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Obter lançamentos por ID da carga útil' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID da carga' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: LaunchEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Obter lançamentos por ID da área de lançamento' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID da área de lançamento' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: LaunchEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Obter lançamentos por nome do local de lançamento' })
  @ApiParam({ name: 'name', type: 'string', description: 'Nome do local de lançamento' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: LaunchEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Obter lançamentos por ID do foguete' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do foguete' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: LaunchEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Obter lançamentos por ID do núcleo' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do núcleo' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: LaunchEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Obter lançamento por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do lançamento' })
  @ApiResponse({ status: 200, description: 'Lançamento encontrado', type: LaunchEntity })
  @ApiNotFoundResponse({ description: 'Lançamento não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar o lançamento' })
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

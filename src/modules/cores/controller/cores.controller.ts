import { Controller, Get, Param } from '@nestjs/common';
import { CoresService } from '../services/cores.service';
import { ApiTags, ApiOperation, ApiResponse, ApiInternalServerErrorResponse, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('cores')
@Controller('cores')
export class CoresController {
  constructor(private coresService: CoresService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todas as cores' })
  @ApiResponse({ status: 200, description: 'Cores encontradas', type: Object })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar as cores' })
  public async getAllCores(): Promise<any> {
    try {
      const cores = await this.coresService.getAllCores();
      return cores;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch cores');
    }
  }

  @Get('rtls-landings')
  @ApiOperation({ summary: 'Obter lançamentos por aterrissagens RTLS' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: Object })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Obter lançamentos por tentativas de aterrissagem ASDS' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: Object })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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
  @ApiOperation({ summary: 'Obter lançamentos por aterrissagens ASDS' })
  @ApiResponse({ status: 200, description: 'Lançamentos encontrados', type: Object })
  @ApiNotFoundResponse({ description: 'Lançamentos não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os lançamentos' })
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

  @Get(':id')
  @ApiOperation({ summary: 'Obter core por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do core' })
  @ApiResponse({ status: 200, description: 'Core encontrado', type: Object })
  @ApiNotFoundResponse({ description: 'Core não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar o core' })
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
}

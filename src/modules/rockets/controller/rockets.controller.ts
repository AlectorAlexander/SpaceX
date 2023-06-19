import { Controller, Get, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RocketsService } from '../services/rockets.service';
import { RocketEntity } from '../entities/rockets.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('rockets')
@Controller('rockets')
export class RocketsController {
  constructor(private readonly rocketsService: RocketsService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os foguetes' })
  @ApiResponse({ status: 200, description: 'Foguetes encontrados', type: RocketEntity, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os foguetes' })
  async getAllRockets(): Promise<RocketEntity[]> {
    try {
      return await this.rocketsService.getAllRockets();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('pending')
  @ApiOperation({ summary: 'Obter o próximo foguete pendente' })
  @ApiResponse({ status: 200, description: 'Foguete pendente encontrado', type: RocketEntity })
  @ApiNotFoundResponse({ description: 'Nenhum foguete pendente encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar o foguete pendente' })
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
  @ApiOperation({ summary: 'Obter foguetes pelo nome' })
  @ApiParam({ name: 'name', type: 'string', description: 'Nome do foguete' })
  @ApiResponse({ status: 200, description: 'Foguetes encontrados', type: RocketEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Foguetes não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os foguetes' })
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
  @ApiOperation({ summary: 'Obter foguetes pela empresa' })
  @ApiParam({ name: 'company', type: 'string', description: 'Empresa do foguete' })
  @ApiResponse({ status: 200, description: 'Foguetes encontrados', type: RocketEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Foguetes não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os foguetes' })
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
  @ApiOperation({ summary: 'Obter foguetes pelo país' })
  @ApiParam({ name: 'country', type: 'string', description: 'País do foguete' })
  @ApiResponse({ status: 200, description: 'Foguetes encontrados', type: RocketEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Foguetes não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os foguetes' })
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
  @ApiOperation({ summary: 'Obter foguetes com sucesso' })
  @ApiResponse({ status: 200, description: 'Foguetes com sucesso encontrados', type: RocketEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Nenhum foguete com sucesso encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os foguetes' })
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
  @ApiOperation({ summary: 'Obter foguetes com falha' })
  @ApiResponse({ status: 200, description: 'Foguetes com falha encontrados', type: RocketEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Nenhum foguete com falha encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os foguetes' })
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
  @ApiOperation({ summary: 'Obter o foguete ativo' })
  @ApiResponse({ status: 200, description: 'Foguete ativo encontrado', type: RocketEntity })
  @ApiNotFoundResponse({ description: 'Nenhum foguete ativo encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar o foguete ativo' })
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
  @ApiOperation({ summary: 'Obter foguetes Falcon' })
  @ApiResponse({ status: 200, description: 'Foguetes Falcon encontrados', type: RocketEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Nenhum foguete Falcon encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os foguetes' })
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
  @ApiOperation({ summary: 'Obter foguetes com alta taxa de sucesso' })
  @ApiResponse({ status: 200, description: 'Foguetes com alta taxa de sucesso encontrados', type: RocketEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Nenhum foguete com alta taxa de sucesso encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os foguetes' })
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
  @ApiOperation({ summary: 'Obter foguetes com imagens' })
  @ApiResponse({ status: 200, description: 'Foguetes com imagens encontrados', type: RocketEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Nenhum foguete com imagens encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os foguetes' })
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
  @ApiOperation({ summary: 'Obter foguetes lançados após uma determinada data' })
  @ApiParam({ name: 'date', type: 'string', description: 'Data no formato YYYY-MM-DD' })
  @ApiResponse({ status: 200, description: 'Foguetes encontrados', type: RocketEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Nenhum foguete encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os foguetes' })
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
  @ApiOperation({ summary: 'Obter foguete pelo ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do foguete' })
  @ApiResponse({ status: 200, description: 'Foguete encontrado', type: RocketEntity })
  @ApiNotFoundResponse({ description: 'Foguete não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar o foguete' })
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

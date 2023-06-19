import { LaunchpadEntity } from '../entities/launchpads.entity';
import { Controller, Get, Param, Res, HttpStatus, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { LaunchpadService } from '../services/launchpads.service';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('launchpads')
@Controller('launchpads')
class LaunchpadsController {
  constructor(private readonly launchpadService: LaunchpadService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os locais de lançamento' })
  @ApiResponse({ status: 200, description: 'Locais de lançamento encontrados', type: LaunchpadEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Nenhum local de lançamento encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os locais de lançamento' })
  public async getAllLaunchpads(@Res() res: Response): Promise<void> {
    const launchpads = await this.launchpadService.getAllLaunchpads();
    if (!launchpads || launchpads.length === 0) {
      throw new NotFoundException('No launchpads found');
    }
    res.status(HttpStatus.OK).json(launchpads);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Obter local de lançamento por nome' })
  @ApiParam({ name: 'name', type: 'string', description: 'Nome do local de lançamento' })
  @ApiResponse({ status: 200, description: 'Local de lançamento encontrado', type: LaunchpadEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Local de lançamento não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar o local de lançamento' })
  public async getLaunchpadByName(@Param('name') name: string): Promise<LaunchpadEntity[]> {
    const launchpad = await this.launchpadService.getLaunchpadByName(name);
    if (!launchpad || launchpad.length === 0) {
      throw new NotFoundException(`Launchpad with name ${name} not found`);
    }
    return launchpad;
  }

  @Get('locality/:locality')
  @ApiOperation({ summary: 'Obter local de lançamento por localidade' })
  @ApiParam({ name: 'locality', type: 'string', description: 'Localidade do local de lançamento' })
  @ApiResponse({ status: 200, description: 'Local de lançamento encontrado', type: LaunchpadEntity })
  @ApiNotFoundResponse({ description: 'Local de lançamento não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar o local de lançamento' })
  public async getLaunchpadByLocality(@Param('locality') locality: string, @Res() res: Response): Promise<void> {
    const launchpad = await this.launchpadService.getLaunchpadByLocality(locality);
    if (!launchpad) {
      throw new NotFoundException(`Launchpad with locality ${locality} not found`);
    }
    res.status(HttpStatus.OK).json(launchpad);
  }

  @Get('region/:region')
  @ApiOperation({ summary: 'Obter local de lançamento por região' })
  @ApiParam({ name: 'region', type: 'string', description: 'Região do local de lançamento' })
  @ApiResponse({ status: 200, description: 'Local de lançamento encontrado', type: LaunchpadEntity })
  @ApiNotFoundResponse({ description: 'Local de lançamento não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar o local de lançamento' })
  public async getLaunchpadByRegion(@Param('region') region: string, @Res() res: Response): Promise<void> {
    const launchpad = await this.launchpadService.getLaunchpadByRegion(region);
    if (!launchpad) {
      throw new NotFoundException(`Launchpad with region ${region} not found`);
    }
    res.status(HttpStatus.OK).json(launchpad);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter local de lançamento por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do local de lançamento' })
  @ApiResponse({ status: 200, description: 'Local de lançamento encontrado', type: LaunchpadEntity })
  @ApiNotFoundResponse({ description: 'Local de lançamento não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar o local de lançamento' })
  public async getLaunchpadById(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const launchpad = await this.launchpadService.getLaunchpadById(id);
    if (!launchpad) {
      throw new NotFoundException('Launchpad not found');
    }
    res.json(launchpad);
  }
}

export default LaunchpadsController;

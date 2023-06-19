import { Controller, Get, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CapsulesService } from '../services/capsules.service';
import { CapsulesEntity } from '../entities/capsules.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('capsules')
@Controller('capsules')
export class CapsulesController {
  constructor(private readonly capsulesService: CapsulesService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todas as cápsulas' })
  @ApiResponse({ status: 200, description: 'Cápsulas encontradas', type: CapsulesEntity, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar as cápsulas' })
  public async getAllCapsules(): Promise<CapsulesEntity[]> {
    try {
      const capsules = await this.capsulesService.getAllCapsules();
      return capsules;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch capsules');
    }
  }

  @Get('by-times-used')
  @ApiOperation({ summary: 'Obter cápsulas por vezes usadas' })
  @ApiResponse({ status: 200, description: 'Cápsulas encontradas', type: CapsulesEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Cápsulas não encontradas' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar as cápsulas' })
  public async getCapsulesByTimesUsed(): Promise<CapsulesEntity[]> {
    try {
      const capsules = await this.capsulesService.getCapsulesByTimesUsed();
      if (!capsules || capsules.length === 0) {
        throw new NotFoundException('Capsules not found');
      }
      return capsules;
    } catch (error) {
      console.error(error);
      if (error.response.statusCode === 404) {
        return error.response;
      }
      throw new InternalServerErrorException('Failed to fetch capsules');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter cápsula por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID da cápsula' })
  @ApiResponse({ status: 200, description: 'Cápsula encontrada', type: CapsulesEntity })
  @ApiNotFoundResponse({ description: 'Cápsula não encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar a cápsula' })
  public async getCapsuleById(@Param('id') id: string): Promise<CapsulesEntity> {
    try {
      const capsule = await this.capsulesService.getCapsuleById(id);
      if (!capsule) {
        throw new NotFoundException('CapsulesEntity not found');
      }
      return capsule;
    } catch (error) {
      if (error.response.statusCode === 404) {
        return error.response;
      }
      throw new InternalServerErrorException('Failed to fetch capsules');
    }
  }
}

import { Controller, Get, Param, HttpStatus, NotFoundException } from '@nestjs/common';
import { PayloadsService } from '../services/payloads.service';
import { PayloadEntity } from '../entities/payloads.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('payloads')
@Controller('payloads')
export class PayloadsController {
  constructor(private readonly payloadsService: PayloadsService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os payloads' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Payloads encontrados', type: PayloadEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Payloads não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os payloads' })
  public async getAllPayloads(): Promise<PayloadEntity[]> {
    try {
      const payloads = await this.payloadsService.getAllPayloads();
      return payloads;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Failed to fetch payloads');
    }
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Obter payloads por nome' })
  @ApiParam({ name: 'name', type: 'string', description: 'Nome do payload' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Payloads encontrados', type: PayloadEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Payloads não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os payloads' })
  public async getPayloadByName(@Param('name') name: string): Promise<PayloadEntity[]> {
    try {
      const newName = name.replace(/_/g, ' ').toUpperCase() as string;
      const payloads = await this.payloadsService.getPayloadByName(newName);
      if (payloads.length > 0) {
        return payloads;
      } else {
        throw new NotFoundException('PayloadEntity not found');
      }
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Failed to fetch payload');
    }
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Obter payloads por tipo' })
  @ApiParam({ name: 'type', type: 'string', description: 'Tipo do payload' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Payloads encontrados', type: PayloadEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Payloads não encontrados' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar os payloads' })
  public async getPayloadByType(@Param('type') type: string): Promise<PayloadEntity[]> {
    try {
      const payloads = await this.payloadsService.getPayloadByType(type);
      if (payloads.length > 0) {
        return payloads;
      } else {
        throw new NotFoundException('PayloadEntity not found');
      }
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Failed to fetch payload');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter payload por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID do payload' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Payload encontrado', type: PayloadEntity })
  @ApiNotFoundResponse({ description: 'Payload não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Falha ao buscar o payload' })
  public async getPayloadById(@Param('id') id: string): Promise<PayloadEntity> {
    try {
      const payload = await this.payloadsService.getPayloadById(id);
      if (payload) {
        return payload;
      } else {
        throw new NotFoundException('PayloadEntity not found');
      }
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Failed to fetch payload');
    }
  }

}

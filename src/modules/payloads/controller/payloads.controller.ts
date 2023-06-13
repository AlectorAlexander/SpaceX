import { Controller, Get, Param, HttpStatus, NotFoundException } from '@nestjs/common';
import { PayloadsService } from '../services/payloads.service';
import { PayloadEntity } from '../entities/payloads.entity';

@Controller('payloads')
export class PayloadsController {
  constructor(private readonly payloadsService: PayloadsService) {}

  @Get()
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

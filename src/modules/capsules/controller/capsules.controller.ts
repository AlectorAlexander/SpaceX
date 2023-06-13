import { Controller, Get, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CapsulesService } from '../services/capsules.service';
import { CapsulesEntity } from '../entities/capsules.entity';

@Controller('capsules')
export class CapsulesController {
  constructor(private readonly capsulesService: CapsulesService) {}

  @Get()
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
  public async getCapsulesByTimesUsed(): Promise<CapsulesEntity[]> {
    try {
      const capsules = await this.capsulesService.getCapsulesByTimesUsed();
      if (!capsules || capsules.length === 0) {
        throw new NotFoundException('Capsules not found');
      }
      return capsules;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch capsules');
    }
  }

  @Get(':id')
  public async getCapsuleById(@Param('id') id: string): Promise<CapsulesEntity> {
    try {
      const capsule = await this.capsulesService.getCapsuleById(id);
      if (!capsule) {
        throw new NotFoundException('CapsulesEntity not found');
      }
      return capsule;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch capsule');
    }
  }
}

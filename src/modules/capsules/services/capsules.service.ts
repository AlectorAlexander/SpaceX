import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CapsulesEntity } from '../entities/capsules.entity';

@Injectable()
export class CapsulesService {
  constructor(
    @InjectRepository(CapsulesEntity)
    private readonly capsuleRepository: Repository<CapsulesEntity>,
  ) {}

  public async getAllCapsules(): Promise<CapsulesEntity[]> {
    const capsules = await this.capsuleRepository.find();
    return capsules;
  }

  public async getCapsuleById(id: string): Promise<CapsulesEntity | null> {
    const capsule = await this.capsuleRepository.findOne({where: {id}});
    return capsule || null;
  }

  public async getCapsulesByTimesUsed(): Promise<CapsulesEntity[] | null> {
      const capsules = await this.capsuleRepository.find({
        order: {
          reuse_count: 'DESC',
        },
      });
      return capsules;

    }
}

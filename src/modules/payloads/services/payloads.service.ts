import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PayloadEntity } from '../entities/payloads.entity';

@Injectable()
export class PayloadsService {
  constructor(
    @InjectRepository(PayloadEntity)
    private readonly payloadRepository: Repository<PayloadEntity>,
  ) {}

  public async getAllPayloads(): Promise<PayloadEntity[]> {
    const payloads = await this.payloadRepository.find();
    return payloads;
  }

  public async getPayloadById(id: string): Promise<PayloadEntity | null> {
    const payload = await this.payloadRepository.findOne({
      where: {id}});
    return payload;
  }

  public async getPayloadByName(name: string): Promise<PayloadEntity[] | null> {
    try {
      const payloads = await this.payloadRepository.find({
        where: {
          name: Like(`%${name}%`),
        },
      });

      return payloads;
    } catch (error) {
      console.error('Error in getPayloadByName:', error);
      return null;
    }
  }

  public async getPayloadByType(type: string): Promise<PayloadEntity[] | null> {
    try {
      const payloads = await this.payloadRepository.find({
        where: {
          type: Like(`%${type}%`),
        },
      });

      return payloads;
    } catch (error) {
      console.error('Error in getPayloadByType:', error);
      return null;
    }
  }
}

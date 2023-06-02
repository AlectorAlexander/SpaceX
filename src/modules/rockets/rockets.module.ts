import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RocketEntity } from './entities/rockets.entity';
import { RocketsController } from './controller/rockets.controller';
import { RocketsService } from './services/rockets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RocketEntity]),
  ],
  controllers: [RocketsController],
  providers: [RocketsService],
})
export class RocketsModule {}

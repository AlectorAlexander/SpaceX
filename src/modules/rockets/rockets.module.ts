import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RocketEntity } from './entities/rockets.entity';
import { RocketsController } from './controller/rockets.controller';
import { RocketsService } from './services/rockets.service';
import { LaunchModule } from '../launches/launch.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RocketEntity]),
    LaunchModule,
  ],
  controllers: [RocketsController],
  providers: [RocketsService],
  exports: [RocketsService],
})
export class RocketsModule {}

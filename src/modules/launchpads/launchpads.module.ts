import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaunchpadEntity } from './entities/launchpads.entity';
import LaunchpadsController from './controller/launchpads.controller';
import { LaunchpadService } from './services/launchpads.service';

@Module({
  imports: [TypeOrmModule.forFeature([LaunchpadEntity])],
  controllers: [LaunchpadsController],
  providers: [LaunchpadService],
})
export class LaunchpadsModule {}

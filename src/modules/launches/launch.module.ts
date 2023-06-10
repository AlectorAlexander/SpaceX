import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaunchController } from './controller/launches.controller';
import { LaunchEntity } from './entities/launches.entity';
import { LaunchService } from './services/launches.service';
import { LaunchpadsModule } from '../launchpads/launchpads.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LaunchEntity]), 
    LaunchpadsModule
  ],
  controllers: [LaunchController],
  providers: [LaunchService],
  exports: [LaunchService],
})
export class LaunchModule {}

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaunchController } from './controller/launches.controller';
import { LaunchEntity } from './entities/launches.entity';
import { LaunchService } from './services/launches.service';
import { LaunchpadsModule } from '../launchpads/launchpads.module';
import { RocketsModule } from '../rockets/rockets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LaunchEntity]), 
    LaunchpadsModule, 
    forwardRef(() => RocketsModule),
  ],
  controllers: [LaunchController],
  providers: [LaunchService],
  exports: [LaunchService],
})
export class LaunchModule {}

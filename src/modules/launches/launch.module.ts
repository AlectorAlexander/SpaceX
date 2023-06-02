import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaunchController } from './controller/launches.controller';
import { LaunchEntity } from './entities/launches.entity';
import { LaunchService } from './services/launches.service';

@Module({
  imports: [TypeOrmModule.forFeature([LaunchEntity])],
  controllers: [LaunchController],
  providers: [LaunchService],
})
export class LaunchModule {}

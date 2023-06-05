import { Module } from '@nestjs/common';
import { CapsulesController } from './controller/capsules.controller';
import { CapsulesService } from './services/capsules.service';
import { CapsulesEntity } from './entities/capsules.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CapsulesEntity])
  ],
  controllers: [CapsulesController],
  providers: [CapsulesService],
})
export class CapsulesModule {}

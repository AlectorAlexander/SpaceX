import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreEntity } from './entities/cores.entity';
import {CoresController} from './controller/cores.controller';
import { CoresService } from './services/cores.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoreEntity])],
  controllers: [CoresController],
  providers: [CoresService],
})
class CoresModule {}

export default CoresModule;

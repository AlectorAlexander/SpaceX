import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayloadEntity } from './entities/payloads.entity';
import { PayloadsController } from './controller/app.controller';
import { PayloadsService } from './services/payloads.service';

@Module({
  imports: [TypeOrmModule.forFeature([PayloadEntity])],
  controllers: [PayloadsController],
  providers: [PayloadsService],
})
export class PayloadModule {}

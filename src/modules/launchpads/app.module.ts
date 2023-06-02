import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from './services/launchpads.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

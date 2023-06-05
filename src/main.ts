import { NestFactory } from '@nestjs/core';
import { MainModule } from './modules/main.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

bootstrap();

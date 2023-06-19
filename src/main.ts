import { NestFactory } from '@nestjs/core';
import { MainModule } from './modules/main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const options = new DocumentBuilder()
  .setTitle('Nome da API')
  .setDescription('Descrição da API')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();

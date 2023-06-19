import { NestFactory } from '@nestjs/core';
import { MainModule } from './modules/main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const options = new DocumentBuilder()
  .setTitle('Space X API')
  .setDescription('A SpaceX, empresa de exploração espacial fundada por Elon Musk, disponibiliza uma API pública que fornece informações sobre missões, foguetes, cápsulas e lançamentos realizados pela empresa. Essa API permite que os desenvolvedores acessem dados atualizados sobre as atividades da SpaceX e os utilizem em suas próprias aplicações.')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();

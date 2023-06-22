import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { writeFileSync } from 'fs';

import { ImagesModule } from './images/images.module';

async function bootstrap() {
  const app = await NestFactory.create(ImagesModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Image Reshaper')
    .setDescription('Reshapes your image into desired state.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const outputPath = path.resolve(process.cwd(), 'swagger.json');
  writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8' });

  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);
}

bootstrap();

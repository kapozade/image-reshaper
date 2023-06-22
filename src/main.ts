import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { resolve } from 'path';
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

  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);
  if (process.env.NODE_ENV === 'development') {
    const swaggerFolderPath = resolve(process.cwd(), 'swagger-docs');
    const swaggerJsonPath = resolve(swaggerFolderPath, 'swagger.json');
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(swaggerJsonPath, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger-docs/swagger.json'`);
  }
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ImagesModule } from './images/images.module';

async function bootstrap() {
  const app = await NestFactory.create(ImagesModule);
  const config = new DocumentBuilder()
    .setTitle('Image Reshaper')
    .setDescription('Reshapes your image into desired state.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();

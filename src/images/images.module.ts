import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}

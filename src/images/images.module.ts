import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionInterceptor } from 'src/shared/interceptors/global-exception.interceptor';

@Module({
  imports: [],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalExceptionInterceptor,
    },
  ],
})
export class ImagesModule {}

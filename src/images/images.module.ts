import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ImagesController } from 'images/api/images.controller';
import { GlobalExceptionInterceptor } from 'shared/interceptors/global-exception.interceptor';
import { ImagesService } from 'images/services/images.service';

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

import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ImagesController } from 'src/images/api/images.controller';
import { GlobalExceptionInterceptor } from 'src/shared/interceptors/global-exception.interceptor';
import { ImagesService } from 'src/images/services/images.service';
import { RequestBodySizeInterceptor } from 'src/shared/interceptors/request-body-size.interceptor';

@Module({
  imports: [],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalExceptionInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestBodySizeInterceptor,
      useValue: 50 * 1024,
    },
  ],
})
export class ImagesModule {}

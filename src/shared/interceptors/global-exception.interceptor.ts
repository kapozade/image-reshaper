import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request } from 'express';

import { HttpStatusUtils } from 'src/shared/utils/http-status.utils';
import { MessageKeys } from 'src/shared/constants/message-keys';
import { ValueConstants } from 'src/shared/constants/value-constants';

@Injectable()
export class GlobalExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    if (
      request.method === 'POST' &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      +request.headers['content-length']! > ValueConstants.CONTENT_LENGTH_SIZE
    ) {
      return throwError(
        () =>
          new HttpException(
            'Request body size exceeded the allowed limit',
            413,
            {
              cause: new Error('Request body size exceeded the allowed limit'),
              description: 'Request body size exceeded the allowed limit',
            },
          ),
      );
    }

    return next.handle().pipe(
      catchError((error) => {
        console.log(error);
        if (HttpStatusUtils.IsClientSideError(error.status)) {
          return throwError(
            () =>
              new HttpException(
                error.response.message ?? error.response,
                error.status,
              ),
          );
        }
        return throwError(
          () =>
            new InternalServerErrorException(MessageKeys.INTERNAL_SERVER_ERROR),
        );
      }),
    );
  }
}

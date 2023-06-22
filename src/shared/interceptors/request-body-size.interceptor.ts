import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request } from 'express';
import { ValueConstants } from '../constants/value-constants';

@Injectable()
export class RequestBodySizeInterceptor implements NestInterceptor {
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
        return throwError(
          () =>
            new InternalServerErrorException('request.body.size.handler.error'),
        );
      }),
    );
  }
}

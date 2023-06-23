import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request } from 'express';
import { MessageKeys } from '../constants/message-keys';
import { ValueConstants } from '../constants/value-constants';
import { HttpStatusUtils } from '../utils/http-status.utils';
import { ErrorModel } from '../models/error-response.model';

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
            new ErrorModel(
              'Request body size exceeded the allowed limit',
              ValueConstants.CONTENT_LENGTH_SIZE / (1024 * 1024) + 'MB',
            ).toStringify(),
            HttpStatus.PAYLOAD_TOO_LARGE,
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

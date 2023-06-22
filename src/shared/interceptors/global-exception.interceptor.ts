import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpStatusUtils } from '../utils/http-status.utils';
import { MessageKeys } from '../constants/message-keys';

@Injectable()
export class GlobalExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.log(error);
        if (HttpStatusUtils.IsClientSideError(error.status)) {
          return throwError(
            () => new BadRequestException(error.response.message),
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

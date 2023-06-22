import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import {
  ErrorModel,
  ErrorResponseModel,
} from 'shared/models/error-response.model';
import 'shared/utils/string.extensions';
import { HttpStatusUtils } from 'shared/utils/http-status.utils';
import { MessageKeys } from 'shared/constants/message-keys';

@Catch(HttpException)
export class ImageReshaperHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse() as Response;
    const exceptionResponse = exception.getResponse() as any;

    const statusCode = this.getStatusCode(exception);
    let errorResponseModel = new ErrorResponseModel();
    if (HttpStatusUtils.IsClientSideError(statusCode)) {
      errorResponseModel = this.generatePayload(exceptionResponse);
    } else {
      errorResponseModel = this.generatePayload([
        MessageKeys.INTERNAL_SERVER_ERROR,
      ]);
    }

    response.status(statusCode).json(errorResponseModel);
  }

  getStatusCode(exception: any) {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception.status) statusCode = exception.status;
    else if (exception.statusCode) statusCode = exception.statusCode;

    return statusCode;
  }

  generatePayload(errorMessages: string[] | string): ErrorResponseModel {
    const errorResponseModel = new ErrorResponseModel();
    if (!errorMessages) return errorResponseModel;

    if (!Array.isArray(errorMessages)) {
      const errorModel = new ErrorModel(errorMessages);
      errorResponseModel.addError(errorModel);
      return errorResponseModel;
    }

    for (const message of errorMessages) {
      let errorModel: ErrorModel | null = (
        message as string
      ).TryJSONParse<ErrorModel>();

      if (errorModel != null) {
        errorResponseModel.addError(errorModel);
      } else {
        errorModel = new ErrorModel(message);
        errorResponseModel.addError(errorModel);
      }
    }
    return errorResponseModel;
  }
}

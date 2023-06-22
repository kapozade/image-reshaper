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
} from '../dto/error-response-model.dto';
import '../utils/string.extensions';
import { HttpStatusUtils } from '../utils/http-status.utils';
import { MessageKeys } from '../constants/message-keys';

@Catch(HttpException)
export class ImageReshaperHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse() as Response;
    const exceptionResponse = exception.getResponse() as any;

    const statusCode = this.getStatusCode(exception);
    let errorResponseModel = new ErrorResponseModel();
    if (HttpStatusUtils.IsClientSideError(statusCode)) {
      errorResponseModel = this.generatePayload(exceptionResponse.message);
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

  generatePayload(errorMessages: string[]): ErrorResponseModel {
    const errorResponseModel = new ErrorResponseModel();
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

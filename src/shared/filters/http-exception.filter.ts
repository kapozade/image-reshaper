import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MessageKeys } from '../constants/message-keys';
import { ErrorResponseModel, ErrorModel } from '../models/error-response.model';
import { HttpStatusUtils } from '../utils/http-status.utils';
import { StringUtils } from '../utils/string.utils';

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
      let errorModel: ErrorModel | null =
        StringUtils.TryJSONParse<ErrorModel | null>(errorMessages);
      if (errorModel == null) errorModel = new ErrorModel(errorMessages);
      errorResponseModel.addError(errorModel);
      return errorResponseModel;
    }

    for (const message of errorMessages) {
      let errorModel: ErrorModel | null =
        StringUtils.TryJSONParse<ErrorModel | null>(message);
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

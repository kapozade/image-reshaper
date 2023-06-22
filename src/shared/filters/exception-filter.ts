import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

import {
  ErrorModel,
  ErrorResponseModel,
} from '../dto/error-response-model.dto';

import '../extensions/string-extensions';

@Catch(BadRequestException)
export class ImageReshaperExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse() as Response;
    const exceptionResponse = exception.getResponse() as any;

    const errorResponseModel = new ErrorResponseModel();
    for (const message of exceptionResponse.message) {
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

    response.status(400).json(errorResponseModel);
  }
}

import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { ImagesService } from '../services/images.service';
import { ReshapeImageRequest } from './models/reshape-image.request';
import { ReshapeImageCommand } from '../services/commands/reshape-image.command';
import {
  ReshapeImageResponse,
  ReshapeImagesResponse,
} from './models/reshape-image.response';
import { ImageReshaperHttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { ErrorResponseModel } from 'src/shared/models/error-response.model';

@ApiTags('Images')
@Controller('api/v1/images')
@UseFilters(ImageReshaperHttpExceptionFilter)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiCreatedResponse({ type: ReshapeImagesResponse })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  @ApiPayloadTooLargeResponse({ type: ErrorResponseModel })
  @ApiInternalServerErrorResponse({ type: ErrorResponseModel })
  async reshapeImage(
    @Body() req: ReshapeImageRequest,
  ): Promise<ReshapeImagesResponse> {
    const command: ReshapeImageCommand = plainToClass(ReshapeImageCommand, req);
    const result = await this.imagesService.reshapeImageAsync(command);
    const reshapedImages = plainToClass(ReshapeImageResponse, result);
    return new ReshapeImagesResponse(reshapedImages);
  }
}

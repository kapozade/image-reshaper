import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { ErrorResponseModel } from 'src/shared/models/error-response.model';
import { ImageReshaperHttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import {
  ReshapeImageResponse,
  ReshapeImagesResponse,
} from 'src/images/api/models/reshape-image.response';
import { ReshapeImageCommand } from 'src/images/services/commands/reshape-image.command';
import { ReshapeImageRequest } from 'src/images/api/models/reshape-image.request';
import { ImagesService } from 'src/images/services/images.service';

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

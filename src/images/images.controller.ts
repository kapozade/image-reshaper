import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { ImagesService } from './services/images.service';
import { ReshapeImageRequest } from './dto/reshape-image.request';
import { ErrorResponseModel } from 'src/shared/dto/error-response-model.dto';
import { ImageReshaperHttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import {
  ReshapeImageResponse,
  ReshapeImagesResponse,
} from './dto/reshape-image.response';
import { ReshapeImageCommand } from './services/commands/reshape-image.command';

@ApiTags('Images')
@Controller('api/v1/images')
@UseFilters(ImageReshaperHttpExceptionFilter)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiCreatedResponse({ type: ReshapeImagesResponse })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  async reshapeImage(
    @Body() req: ReshapeImageRequest,
  ): Promise<ReshapeImagesResponse> {
    const command: ReshapeImageCommand = plainToClass(ReshapeImageCommand, req);
    const result = await this.imagesService.reshapeImageAsync(command);
    const reshapedImages = plainToClass(ReshapeImageResponse, result);
    return new ReshapeImagesResponse(reshapedImages);
  }
}

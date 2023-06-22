import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ImagesService } from './images.service';
import {
  ReshapeImageRequestDto,
  ReshapeImagesResponseDto,
} from './dto/reshape-image.dto';
import { ErrorResponseModel } from 'src/shared/dto/error-response-model.dto';
import { ImageReshaperHttpExceptionFilter } from 'src/shared/filters/http-exception.filter';

@ApiTags('Images')
@Controller('api/v1/images')
@UseFilters(ImageReshaperHttpExceptionFilter)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiCreatedResponse({ type: ReshapeImagesResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  async reshapeImage(
    @Body() req: ReshapeImageRequestDto,
  ): Promise<ReshapeImagesResponseDto> {
    return await this.imagesService.reshapeImageAsync(req);
  }
}

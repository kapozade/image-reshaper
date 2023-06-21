import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { ImagesService } from './images.service';
import {
  ReshapeImageRequestDto,
  ReshapeImagesResponseDto,
} from './dto/reshape-image.dto';

@ApiTags('Images')
@Controller('api/v1/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiCreatedResponse({ type: ReshapeImagesResponseDto })
  reshapeImage(@Body() req: ReshapeImageRequestDto): ReshapeImagesResponseDto {
    return new ReshapeImagesResponseDto();
  }
}

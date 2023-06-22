import { Injectable, Scope } from '@nestjs/common';
import sharp from 'sharp';

import {
  ReshapeImageRequestDto,
  ReshapeImageResponseDto,
  ReshapeImagesResponseDto,
} from './dto/reshape-image.dto';
import { ImageTypes } from './image-extensions.enum';
import { ValueConstants } from 'src/shared/constants/value-constants';

@Injectable({
  scope: Scope.REQUEST,
})
export class ImagesService {
  async reshapeImageAsync(
    request: ReshapeImageRequestDto,
  ): Promise<ReshapeImagesResponseDto> {
    const buffer = Buffer.from(request.content, 'base64');
    const result = new ReshapeImagesResponseDto();

    for (const option of request.options) {
      let client = sharp(buffer).resize(option.width, option.height);

      switch (option.extension) {
        case ImageTypes.JPG:
          client = client.jpeg({
            quality: option.quality ?? ValueConstants.DEFAULT_QUALITY,
          });
          break;
        case ImageTypes.PNG:
          client = client.png({
            quality: option.quality ?? ValueConstants.DEFAULT_QUALITY,
          });
          break;
        case ImageTypes.WEBP:
          client = client.webp({
            quality: option.quality ?? ValueConstants.DEFAULT_QUALITY,
          });
          break;
        default:
          throw new Error('Unknown image type provided.');
      }

      const reshapeOpResult = await client.withMetadata().toBuffer();
      const imageResponse = new ReshapeImageResponseDto();
      imageResponse.content = reshapeOpResult.toString('base64');
      imageResponse.extension = option.extension;
      imageResponse.height = option.height;
      imageResponse.width = option.width;
      imageResponse.quality = option.quality;
      result.images.push(imageResponse);
    }

    return result;
  }
}

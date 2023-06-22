import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import {
  ReshapeImageCommand,
  ReshapeImageCommandResult,
} from './commands/reshape-image.command';
import { ImageTypes } from '../core/image-extensions.enum';
import { ValueConstants } from '../../shared/constants/value-constants';

@Injectable()
export class ImagesService {
  async reshapeImageAsync(
    request: ReshapeImageCommand,
  ): Promise<ReshapeImageCommandResult[]> {
    const buffer = Buffer.from(request.content, 'base64');
    const result: ReshapeImageCommandResult[] = [];

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
      const imageResponse = new ReshapeImageCommandResult(
        reshapeOpResult.toString('base64'),
        option.width,
        option.height,
        option.quality,
        option.extension,
      );
      result.push(imageResponse);
    }

    return result;
  }
}

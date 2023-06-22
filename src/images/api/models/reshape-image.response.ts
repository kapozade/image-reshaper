import { ApiProperty } from '@nestjs/swagger';
import { ImageTypes } from 'images/core/image-extensions.enum';

export class ReshapeImagesResponse {
  @ApiProperty({ type: () => ReshapeImageResponse, isArray: true })
  readonly images: ReshapeImageResponse[] = [];

  constructor(images: ReshapeImageResponse[]) {
    this.images = images;
  }
}

export class ReshapeImageResponse {
  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly width: number;

  @ApiProperty()
  readonly height: number;

  @ApiProperty()
  readonly quality: number | null;

  @ApiProperty()
  readonly extension: ImageTypes;

  constructor(
    content: string,
    width: number,
    height: number,
    quality: number,
    extension: ImageTypes,
  ) {
    this.content = content;
    this.width = width;
    this.height = height;
    this.quality = quality;
    this.extension = extension;
  }
}

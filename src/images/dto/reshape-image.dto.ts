import { ApiProperty } from '@nestjs/swagger';
import { ImageExtensions } from '../image-extensions.enum';

export class ReshapeImageRequestDto {
  @ApiProperty()
  content: string;

  @ApiProperty({
    type: () => ReshapeImageOptionDto,
    isArray: true,
    description: 'Min element count = 1. Max element count = 5',
  })
  options: ReshapeImageOptionDto[];
}

export class ReshapeImageOptionDto {
  @ApiProperty({ description: 'Can be JPG = 1, WEBP = 2, PNG = 3' })
  extension: ImageExtensions;

  @ApiProperty({
    description: 'Max value = 100. Can be set as null to use default value.',
  })
  quality: number | null;

  @ApiProperty({ description: 'Should be bigger than 1.' })
  width: number;

  @ApiProperty({ description: 'Should be bigger than 1.' })
  height: number;
}

export class ReshapeImagesResponseDto {
  @ApiProperty({ type: () => ReshapeImageResponseDto, isArray: true })
  images: ReshapeImageResponseDto[];
}

export class ReshapeImageResponseDto extends ReshapeImageOptionDto {
  @ApiProperty()
  content: string;
}

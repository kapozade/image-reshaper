import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBase64,
  IsEnum,
  IsNotEmpty,
  Max,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { ImageTypes } from '../image-extensions.enum';
import { ErrorModel } from '../../shared/dto/error-response-model.dto';
import { ValueConstants } from '../../shared/constants/value-constants';
import { MessageKeys } from 'src/shared/constants/message-keys';
import { Type } from 'class-transformer';
import { IsSupportedImage } from 'src/shared/validators/is-supported-image';

export class ReshapeImageRequest {
  @ApiProperty()
  @IsNotEmpty({
    message: new ErrorModel(
      MessageKeys.CONTENT_SHOULD_NOT_BE_EMPTY,
    ).toStringify(),
  })
  @IsBase64({
    message: new ErrorModel(
      MessageKeys.CONTENT_IS_NOT_VALID_BASE64,
    ).toStringify(),
  })
  @Validate(IsSupportedImage)
  readonly content: string;

  @ApiProperty({
    type: () => ReshapeImageOptionRequest,
    isArray: true,
  })
  @ArrayMaxSize(ValueConstants.OPTIONS_MAX_LENGTH, {
    message: new ErrorModel(
      MessageKeys.OPTIONS_MAX_LENGTH,
      ValueConstants.OPTIONS_MAX_LENGTH,
    ).toStringify(),
  })
  @ArrayMinSize(ValueConstants.OPTIONS_MIN_LENGTH, {
    message: new ErrorModel(
      MessageKeys.OPTIONS_MIN_LENGTH,
      ValueConstants.OPTIONS_MIN_LENGTH,
    ).toStringify(),
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReshapeImageOptionRequest)
  readonly options: ReshapeImageOptionRequest[];
}

export class ReshapeImageOptionRequest {
  @ApiProperty({ description: 'Can be JPG = 1, WEBP = 2, PNG = 3' })
  @IsEnum(ImageTypes, {
    message: new ErrorModel(MessageKeys.INVALID_EXTENSION).toStringify(),
  })
  readonly extension: ImageTypes;

  @ApiProperty()
  @ValidateIf((_, value) => value != null)
  @Min(ValueConstants.QUALITY_MIN_VALUE, {
    message: new ErrorModel(
      MessageKeys.QUALITY_GREATER_THAN,
      ValueConstants.QUALITY_MIN_VALUE,
    ).toStringify(),
  })
  @Max(ValueConstants.QUALITY_MAX_VALUE, {
    message: new ErrorModel(
      MessageKeys.QUALITY_SMALLER_THAN,
      ValueConstants.QUALITY_MAX_VALUE,
    ).toStringify(),
  })
  readonly quality: number | null;

  @Min(ValueConstants.WIDTH_MIN_VALUE, {
    message: new ErrorModel(
      MessageKeys.WIDTH_GREATER_THAN,
      ValueConstants.WIDTH_MIN_VALUE,
    ).toStringify(),
  })
  @ApiProperty()
  readonly width: number;

  @Min(ValueConstants.HEIGHT_MIN_VALUE, {
    message: new ErrorModel(
      MessageKeys.HEIGHT_GREATER_THAN,
      ValueConstants.HEIGHT_MIN_VALUE,
    ).toStringify(),
  })
  @ApiProperty()
  readonly height: number;
}

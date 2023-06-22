/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ImageTypeUtils } from '../utils/image-type.utils';
import { ErrorModel } from '../dto/error-response-model.dto';

@ValidatorConstraint({ name: 'isSupportedImage', async: false })
export class IsSupportedImage implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments | undefined,
  ): boolean | Promise<boolean> {
    if (value == null || value.trim() === '') return false;

    return ImageTypeUtils.IsSupportedImageType(value);
  }
  defaultMessage?(_?: ValidationArguments | undefined): string {
    return new ErrorModel('image.content.not.supported').toStringify();
  }
}

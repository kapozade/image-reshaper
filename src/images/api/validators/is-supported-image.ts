/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ImageTypeUtils } from '../../../shared/utils/image-type.utils';
import { ErrorModel } from '../../../shared/models/error-response.model';

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

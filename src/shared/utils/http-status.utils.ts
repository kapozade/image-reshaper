import { HttpStatus } from '@nestjs/common';

export class HttpStatusUtils {
  static IsClientSideError(data: HttpStatus): boolean {
    return data >= 400 && data < 500;
  }
  static IsServerSideError(data: HttpStatus): boolean {
    return data >= 500;
  }
}

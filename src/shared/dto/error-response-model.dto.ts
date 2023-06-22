import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseModel {
  @ApiProperty({ isArray: true, type: () => ErrorModel })
  errors: ErrorModel[];
  get getErrors() {
    return this.errors;
  }

  constructor() {
    this.errors = [];
  }

  addError(error: ErrorModel): void {
    this.errors.push(error);
  }
}

export class ErrorModel {
  @ApiProperty()
  private readonly message: string;
  get getMessage() {
    return this.message;
  }

  @ApiProperty()
  private readonly data: object | string | number | boolean | null;
  get getData() {
    return this.data;
  }

  constructor(
    message: string,
    data: object | string | number | boolean | null = null,
  ) {
    this.message = message;
    this.data = data;
  }
}

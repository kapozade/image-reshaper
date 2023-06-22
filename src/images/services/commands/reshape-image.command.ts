import { ImageTypes } from 'src/images/core/image-extensions.enum';

export class ReshapeImageCommand {
  readonly content: string;
  readonly options: ReshapeImageOptionCommand[];

  constructor(content: string, options: ReshapeImageOptionCommand[]) {
    this.content = content;
    this.options = options;
  }
}

export class ReshapeImageOptionCommand {
  readonly extension: ImageTypes;
  readonly quality: number | null;
  readonly width: number;
  readonly height: number;

  constructor(
    width: number,
    height: number,
    quality: number | null,
    extension: ImageTypes,
  ) {
    this.extension = extension;
    this.quality = quality;
    this.height = height;
    this.width = width;
  }
}

export class ReshapeImageCommandResult {
  readonly content: string;
  readonly width: number;
  readonly height: number;
  readonly quality: number | null;
  readonly extension: ImageTypes;

  constructor(
    content: string,
    width: number,
    height: number,
    quality: number | null,
    extension: ImageTypes,
  ) {
    this.content = content;
    this.width = width;
    this.height = height;
    this.quality = quality;
    this.extension = extension;
  }
}

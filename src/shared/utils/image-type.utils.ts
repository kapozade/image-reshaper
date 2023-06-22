export class ImageTypeUtils {
  static IsSupportedImageType(data: string): boolean {
    if (data === null || data.trim() === '') return false;

    const firstCharacter = data[0];
    return (
      firstCharacter === '/' || firstCharacter === 'i' || firstCharacter === 'U'
    );
  }
}

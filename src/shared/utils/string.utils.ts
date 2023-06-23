export class StringUtils {
  static TryJSONParse<T>(data: string): T | null {
    try {
      if (!data.startsWith('{')) {
        data = data.substring(data.indexOf('{'), data.length);
      }
      return JSON.parse(data) as T;
    } catch (error) {
      return null;
    }
  }
}

declare global {
  interface String {
    TryJSONParse<T>(): T | null;
  }
}

String.prototype.TryJSONParse = function <T>(): T | null {
  try {
    let message = this as string;
    if (!message.startsWith('{')) {
      message = message.substring(message.indexOf('{'), message.length);
    }
    return JSON.parse(message) as T;
  } catch (error) {
    return null;
  }
};

export {};

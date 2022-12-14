// Generate a random string of a determined length
export const randomString = (length = 8) =>
  (Math.random() + 1).toString(36).substring(length);

export const isString = <T>(value: T) => typeof value === 'string';

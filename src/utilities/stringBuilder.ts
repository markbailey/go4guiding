type Builder = (options: StringBuilderOptions) => StringBuilder;
type Validate = <T>(value: T) => boolean;
export interface StringBuilder {
  append(...args: string[]): StringBuilder;
  appendIf<T>(condition: boolean | Validate, ...args: T[]): StringBuilder;
  appendFormat(format: string, ...args: string[]): StringBuilder;
  insert(index: number, value: string): StringBuilder;
  toString(): string;
}

export interface StringBuilderOptions {
  initialValue?: string;
  seperator?: string;
}

// append function.
// HOF (Higer Order Function) that returns a function for appending the value of a string
// using the generator function.
// @param initialValue: the string value that will be used to prefix the result.
// @param seperator: the string value that will be used to prefix the result.
// @param builder: the function to call at the end of the function (stringBuilder).
// @returns a function that takes a string then triggers builder function in a recursive manor.
const append =
  (initialValue: string, seperator: string, builder: Builder) =>
  (...args: string[]) =>
    builder({
      initialValue: args.reduce(
        (acc, current) => `${acc}${seperator}${current}`,
        initialValue
      ),
      seperator
    });

// appendIf function.
// HOF (Higer Order Function) that returns a function for appending the value of a string
// if the condition is true.
// @param initialValue: the string value that will be used to prefix the result.
// @param seperator: the string value that will be used to prefix the result.
// @param builder: the function to call at the end of the function (stringBuilder).
// @returns a function that takes a string and condition then triggers builder function in a recursive manor.
const appendIf =
  (initialValue: string, seperator: string, builder: Builder) =>
  <T>(condition: boolean | Validate, ...args: T[]) => {
    const validate =
      typeof condition === 'function' ? condition : () => condition;
    const newArgs = args.filter((value) => validate(value)) as string[];
    return append(initialValue, seperator, builder)(...newArgs);
  };

// appendFormat function.
// HOF (Higer Order Function) that returns a function for appending the value of a formatted string
// @param initialValue: the string value that will be used to prefix the result.
// @param seperator: the string value that will be used to prefix the result.
// @param builder: the function to call at the end of the function (stringBuilder).
// @returns a function that takes a string format and array of strings to concatinate,
// then triggers builder function in a recursive manor.
const appendFormat =
  (initialValue: string, seperator: string, builder: Builder) =>
  (format: string, ...args: string[]) =>
    append(
      initialValue,
      seperator,
      builder
    )(args.reduce((acc, current, i) => acc.replace(`{${i}}`, current), format));

// insert function.
// HOF (Higer Order Function) that returns a function for inserting the value of into a string at a particular index.
// @param initialValue: the string value that will be used to prefix the result.
// @param seperator: the string value that will be used to prefix the result.
// @param builder: the function to call at the end of the function (stringBuilder).
// @returns a function that takes a string and condition then triggers builder function in a recursive manor.
const insert =
  (initialValue: string, seperator: string, builder: Builder) =>
  (index: number, value: string) =>
    builder({
      initialValue: initialValue
        .split(seperator)
        .splice(index, 0, value)
        .join(seperator),
      seperator
    });

// builder function
// A recursive function that allows the continuous concatination of a string
// using a generator function and child functions that call this in a recursive manor.
// @param initialValue: the string value use in the initial creation of the final string.
// @param seperator: the string value that will be used to prefix the result.
// @returns an object of functions for concatinating a string.
function stringBuilder(
  options: StringBuilderOptions = {}
): Readonly<StringBuilder> {
  const { initialValue = '', seperator = '' } = options;
  const self = stringBuilder;
  return Object.freeze({
    append: append(initialValue, seperator, self),
    appendIf: appendIf(initialValue, seperator, self),
    appendFormat: appendFormat(initialValue, seperator, self),
    insert: insert(initialValue, seperator, self),
    toString: () => initialValue
  });
}

export default stringBuilder;

import { cloneElement, ReactElement } from 'react';
import { randomString } from './string';

// mapToJSX function
// This function takes an array of objects and maps them to a JSX Element spreading
// the object as props on the element.
// @param items: an array of properties to be mapped.
// @param component: the functional / class component in which to map to.
// @param props: additional properties in which to spread on the component.
const mapToJSX = <T, P extends EmptyProps>(
  items: T[],
  Component: ReactElement,
  props = {} as P
) =>
  items.map((item) =>
    cloneElement(Component, {
      ...props,
      ...item,
      key: randomString(8)
    })
  );

export default mapToJSX;

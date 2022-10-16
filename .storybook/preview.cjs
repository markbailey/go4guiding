import { addDecorator } from '@storybook/react';
import viewports from './viewports.json';

addDecorator((story) => story());

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  viewport: { viewports }
};

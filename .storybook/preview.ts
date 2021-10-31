import { addDecorator } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'
import { withChakraUi } from './custom-decorators/withChakraUi'

export const parameters = {
  stories: ['../src/components/**/stories.tsx'],
  backgrounds: { default: 'light' },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator(withNextRouter())

export const decorators = [withChakraUi] 

import { matchers } from '@emotion/jest';
import { ChakraProvider } from '@chakra-ui/react';
import { render, RenderResult } from '@testing-library/react';

expect.extend(matchers);

export const customRender = (children: React.ReactNode): RenderResult =>
  render(<ChakraProvider resetCSS>{children}</ChakraProvider>);

export * from '@testing-library/react';
export { customRender as render };

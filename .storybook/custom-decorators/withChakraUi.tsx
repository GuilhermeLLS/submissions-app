import { ChakraProvider } from '@chakra-ui/react';
import '../../src/styles/globals.css';

export const withChakraUi = (Story) => {
  return (
    <ChakraProvider resetCSS>
      <Story />
    </ChakraProvider>
  );
};

import { SWRConfig } from 'swr';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';

if (process.env.NODE_ENV === 'development') {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { server } = require('../mocks/server');
    server.listen();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require('../mocks/browser');
    worker.start();
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;

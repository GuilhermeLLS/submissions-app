import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/img/sora-logo.svg" />
          <link rel="apple-touch-icon" href="/img/sora-logo.svg" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="description" content="Submissions app!" />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

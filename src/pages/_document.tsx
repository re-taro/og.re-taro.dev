import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import type { ReactElement } from 'react';

class Document extends NextDocument {
  static override getInitialProps(
    context: DocumentContext,
  ): Promise<DocumentInitialProps> {
    return NextDocument.getInitialProps(context);
  }

  override render(): ReactElement {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
          <meta name="description" content="Rintaro's OGP server" lang="en" />
          <meta name="name" content="ogp.re-taro.dev" />
          <meta
            name="image"
            content="https://ogp.re-taro.dev/api/ogp?title=OG server&domain=ogp.re-taro.dev"
          />
          <meta property="og:title" content="ogp.re-taro.dev" />
          <meta property="og:description" content="Rintaro's OGP server" />
          <meta property="og:type" content="webpage" />
          <meta property="og:url" content="https://ogp.re-taro.dev/" />
          <meta
            property="og:image"
            content="https://ogp.re-taro.dev/api/ogp?title=OG server&domain=ogp.re-taro.dev"
          />
          <meta property="og:locale" content="ja_JP" />
          <meta property="og:site_name" content="ogp.re-taro.dev" />
          <meta name="twitter:title" content="ogp.re-taro.dev" />
          <meta name="twitter:description" content="Rintaro's OGP server" />
          <meta
            name="twitter:image"
            content="https://ogp.re-taro.dev/api/ogp?title=OG server&domain=ogp.re-taro.dev"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@10969_rintaro" />
          <meta name="twitter:creator" content="@10969_rintaro" />
          {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
          <title>OGP server for Rintaro</title>
        </Head>
        <body>
          <ColorModeScript
            initialColorMode="system"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static getInitialProps(props) {
    const sheet = new ServerStyleSheet();
    const page = props.renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Barlow:300,400,500,700,800"
            rel="stylesheet"
            key="googlefonts"
          />
          {/* minireset.css */}
          <style type="text/css" key="minireset">
            {
              'html, body, p, ol, ul, li, dl, dt, dd, blockquote, figure, fieldset, legend, textarea, pre, iframe, hr, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; } h1, h2, h3, h4, h5, h6 { font-size: 100%; font-weight: normal; } ul { list-style: none; } button, input, select, textarea { margin: 0; } html { box-sizing: border-box; } *, *:before, *:after { box-sizing: inherit; } img, embed, iframe, object, video { height: auto; max-width: 100%; } audio { max-width: 100%; } iframe { border: 0; } table { border-collapse: collapse; border-spacing: 0; } td, th { padding: 0; text-align: left; }'
            }
          </style>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;

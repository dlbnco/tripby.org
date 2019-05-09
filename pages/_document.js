import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { Provider as StyletronProvider } from 'styletron-react';
import { ServerStyleSheet } from 'styled-components';
import { styletron } from '../lib/styletron';

class MyDocument extends Document {
  static getInitialProps(props) {
    const sheet = new ServerStyleSheet();
    const page = props.renderPage(App => props =>
      sheet.collectStyles(
        <StyletronProvider value={styletron}>
          <App {...props} />
        </StyletronProvider>
      )
    );
    const styleTags = sheet.getStyleElement();

    const stylesheets = styletron.getStylesheets() || [];
    return { ...page, stylesheets, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          {/* minireset.css */}
          <style type="text/css">
            {
              'html, body, p, ol, ul, li, dl, dt, dd, blockquote, figure, fieldset, legend, textarea, pre, iframe, hr, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; } h1, h2, h3, h4, h5, h6 { font-size: 100%; font-weight: normal; } ul { list-style: none; } button, input, select, textarea { margin: 0; } html { box-sizing: border-box; } *, *:before, *:after { box-sizing: inherit; } img, embed, iframe, object, video { height: auto; max-width: 100%; } audio { max-width: 100%; } iframe { border: 0; } table { border-collapse: collapse; border-spacing: 0; } td, th { padding: 0; text-align: left; }'
            }
          </style>
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
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

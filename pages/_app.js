import App, { Container } from 'next/app';
import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import withApolloClient from '../lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ThemeProvider } from 'styled-components';

import { styletron } from '../lib/styletron';
import Layout from '../components/Layout';
import { defaultTheme } from '../lib/theme';
import IntlProvider from '../components/IntlProvider';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider client={apolloClient}>
            <StyletronProvider value={styletron}>
              <ThemeProvider theme={defaultTheme}>
                <IntlProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </IntlProvider>
              </ThemeProvider>
            </StyletronProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);

import App, { Container } from 'next/app';
import React from 'react';
import Router from 'next/router';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ThemeProvider } from 'styled-components';
import withGA from 'next-ga';

import withApolloClient from '../lib/with-apollo-client';
import Layout from '../components/Layout';
import { defaultTheme } from '../lib/theme';
import IntlProvider from '../components/IntlProvider';
import { GA_TRACKING_ID } from '../lib/constants';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider client={apolloClient}>
            <ThemeProvider theme={defaultTheme}>
              <IntlProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </IntlProvider>
            </ThemeProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withGA(GA_TRACKING_ID, Router)(withApolloClient(MyApp));

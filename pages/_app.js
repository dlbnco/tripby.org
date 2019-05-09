import App, { Container } from 'next/app';
import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import withApolloClient from '../lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';

import { styletron } from '../lib/styletron';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <StyletronProvider value={styletron}>
            <Component {...pageProps} />
          </StyletronProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);

import React from 'react';
import Router from 'next/router';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import withGA from 'next-ga';

import Layout from '../components/Layout';
import { defaultTheme } from '../lib/theme';
import IntlProvider from '../components/IntlProvider';
import { GA_TRACKING_ID } from '../lib/constants';
import TimeMachineProvider from '../components/TimeMachine';
import { withApollo } from '../lib/apollo/init';

const App = ({ Component, pageProps }) => (
  // <ApolloProvider client={client}>
  // <ApolloHooksProvider client={client}>
  <ThemeProvider theme={defaultTheme}>
    <IntlProvider>
      <TimeMachineProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TimeMachineProvider>
    </IntlProvider>
  </ThemeProvider>
  // </ApolloHooksProvider>
  // </ApolloProvider>
);

export default withGA(GA_TRACKING_ID, Router)(withApollo({ ssr: true })(App));

import React from 'react';
import { ThemeProvider } from 'styled-components';

import Layout from '../components/Layout';
import { defaultTheme } from '../lib/theme';
import IntlProvider from '../components/IntlProvider';
import TimeMachineProvider from '../components/TimeMachine';
import Head from 'next/head';

const App = ({ Component, pageProps }) => (
  // <ApolloProvider client={client}>
  // <ApolloHooksProvider client={client}>
  <ThemeProvider theme={defaultTheme}>
    <IntlProvider>
      <TimeMachineProvider>
        <Layout>
          <Head>
            <script
              async
              defer
              src="https://scripts.simpleanalyticscdn.com/latest.js"
            ></script>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </TimeMachineProvider>
    </IntlProvider>
  </ThemeProvider>
  // </ApolloHooksProvider>
  // </ApolloProvider>
);

export default App;

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
              src={process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT}
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

import React from 'react';
import { ThemeProvider } from 'styled-components';

import Layout from '../components/Layout';
import { defaultTheme } from '../lib/theme';
import IntlProvider from '../components/IntlProvider';
import TimeMachineProvider from '../components/TimeMachine';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={new QueryClient()}>
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
  </QueryClientProvider>
);

export default App;

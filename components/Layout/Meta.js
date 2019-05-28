import React from 'react';
import Head from 'next/head';
import { FormattedMessage } from 'react-intl';
import { adopt } from 'react-adopt';

const HeadMessages = adopt({
  title: <FormattedMessage id="App.meta.title" />,
  description: <FormattedMessage id="App.meta.description" />,
});

const AppMeta = () => {
  return (
    <HeadMessages>
      {({ title, description }) => (
        <Head>
          <title key="title">{title}</title>
          <meta name="description" key="description" content={description} />
          <meta
            name="og:description"
            key="og:description"
            content={description}
          />
          <meta name="og:title" key="og:title" content={title} />
        </Head>
      )}
    </HeadMessages>
  );
};

export default AppMeta;

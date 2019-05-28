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
          {/* favicon 👇 */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/safari-pinned-tab.svg"
            color="#6e31cc"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
      )}
    </HeadMessages>
  );
};

export default AppMeta;

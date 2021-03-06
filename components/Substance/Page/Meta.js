import React from 'react';
import Head from 'next/head';
import { adopt } from 'react-adopt';
import { FormattedMessage } from 'react-intl';

const SubstanceMeta = ({ substance }) => {
  const HeadMessages = adopt({
    title: (
      <FormattedMessage
        id="Substance.meta.title"
        values={{ name: substance.name }}
      />
    ),
    description: (
      <FormattedMessage
        id="Substance.meta.description"
        values={{
          name: substance.name,
          class:
            substance.class &&
            substance.class.psychoactive &&
            substance.class.psychoactive.length &&
            substance.class.psychoactive[0],
        }}
      />
    ),
  });
  return (
    <HeadMessages>
      {({ title, description }) => (
        <Head>
          <title key="title">{title}</title>
          <meta name="og:title" key="og:title" content={title} />
          <meta name="description" key="description" content={description} />
          <meta
            name="og:description"
            key="og:description"
            content={description}
          />
        </Head>
      )}
    </HeadMessages>
  );
};

SubstanceMeta.propTypes = {};

export default SubstanceMeta;

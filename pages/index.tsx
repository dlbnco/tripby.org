import { GetStaticProps } from 'next';
import fetch from 'isomorphic-unfetch';
import React from 'react';
import Home from '../components/Home';
import { WIKI_API_URL } from '../lib/constants';
import GET_SUBSTANCES from '../queries/substances';
import { print } from 'graphql';
import { Substance } from '../lib/psy.is';

const HomePage = ({ substances }: { substances: Substance[] }) => (
  <Home substances={substances} />
);

export const getStaticProps: GetStaticProps = async () => {
  const result = await fetch(WIKI_API_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      query: print(GET_SUBSTANCES),
      variables: {
        limit: 300,
      },
    }),
  });
  const json = await result.json();
  const substances = json.data.substances;
  return {
    props: {
      substances,
    },
    revalidate: 86400,
  };
};

export default HomePage;

import { GetStaticPaths } from 'next';
import fetch from 'isomorphic-unfetch';
import { print } from 'graphql';
import { QUERY_LIMIT, WIKI_API_URL } from '../lib/constants';
import { Substance } from './types';
import GET_SUBSTANCES from '../queries/substances';

const getSubstancesPaths: GetStaticPaths = async () => {
  const result = await fetch(WIKI_API_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      query: print(GET_SUBSTANCES),
      variables: {
        limit: QUERY_LIMIT,
      },
    }),
  });
  const json: { data: { substances: Substance[] } } = await result.json();
  const paths = json.data.substances.map((substance) => ({
    params: {
      name: substance.name,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export default getSubstancesPaths;

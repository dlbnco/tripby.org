import { GetStaticProps } from 'next';
import { print } from 'graphql';
import GET_SUBSTANCE from '../components/Substance/Page/query';
import { WIKI_API_URL } from '../lib/constants';

const getSubstanceProps: GetStaticProps = async (context) => {
  const name = context.params?.name;
  const result = await fetch(WIKI_API_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      query: print(GET_SUBSTANCE),
      variables: {
        query: name,
      },
    }),
  });
  const json = await result.json();
  const substance = json.data.substances[0];
  return {
    props: {
      substance,
    },
    revalidate: 86400,
  };
};

export default getSubstanceProps;

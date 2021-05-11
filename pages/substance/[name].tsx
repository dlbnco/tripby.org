import React from 'react';
import fetch from 'isomorphic-unfetch';
import { withRouter } from 'next/router';
import SubstancePage from '../../components/Substance/Page';
import { withApollo } from '../../lib/apollo/init';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { WIKI_API_URL } from '../../lib/constants';
import GET_SUBSTANCE from '../../components/Substance/Page/query';
import { print } from 'graphql';
import GET_SUBSTANCES from '../../queries/substances';
import { Substance } from '../../lib/psy.is';

const SubstanceP: NextPage = ({ substance }) => {
  return <SubstancePage substance={substance} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
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
  const json = (await result.json()) as { data: { substances: Substance[] } };
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

export const getStaticProps: GetStaticProps = async (context) => {
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

export default SubstanceP;

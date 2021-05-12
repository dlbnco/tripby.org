import React from 'react';
import TimeMachineWizard from '../../components/TimeMachine/Wizard';
import GET_SUBSTANCE from '../../components/Substance/Page/query';
import { WIKI_API_URL } from '../../lib/constants';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { print } from 'graphql';
import { FullSubstance, Substance } from '../../lib/psy.is';
import GET_SUBSTANCES from '../../queries/substances';

interface TimeMachinePageProps {
  substance: FullSubstance;
}

const TimeMachinePage: NextPage<TimeMachinePageProps> = ({ substance }) => {
  return (
    <div>
      <TimeMachineWizard substance={substance} />
    </div>
  );
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

export default TimeMachinePage;

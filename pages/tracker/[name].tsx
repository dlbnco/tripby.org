import React from 'react';
import TimeMachineWizard from '../../components/TimeMachine/Wizard';
import { NextPage } from 'next';
import { FullSubstance } from '../../psy.is/types';
import getSubstancesPaths from '../../psy.is/getSubstancesPaths';
import getSubstanceProps from '../../psy.is/getSubstanceProps';

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

export const getStaticPaths = getSubstancesPaths;

export const getStaticProps = getSubstanceProps;

export default TimeMachinePage;

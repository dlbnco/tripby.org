import React from 'react';
import SubstancePage from '../../components/Substance/Page';
import { FullSubstance } from '../../psy.is/types';
import getSubstancesPaths from '../../psy.is/getSubstancesPaths';
import getSubstanceProps from '../../psy.is/getSubstanceProps';
import { NextPage } from 'next';

interface SubstancePProps {
  substance: FullSubstance;
}

const SubstanceP: NextPage<SubstancePProps> = ({ substance }) => {
  return <SubstancePage substance={substance} />;
};

export const getStaticPaths = getSubstancesPaths;

export const getStaticProps = getSubstanceProps;

export default SubstanceP;

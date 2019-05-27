import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import SubstancePage from '../../components/Substance/Page';

const Substance = props => {
  const { query } = useRouter();
  if (query && query.name) {
    return <SubstancePage name={query.name} />;
  }
  return null;
};

Substance.propTypes = {};

export default Substance;

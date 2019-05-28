import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import SubstancePage from '../../components/Substance/Page';

const Substance = ({ router }) => {
  const { query } = router;
  if (query && query.name) {
    return <SubstancePage name={query.name} />;
  }
  return null;
};

Substance.propTypes = {};

export default withRouter(Substance);

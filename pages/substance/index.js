import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import SubstancePage from '../../components/Substance/Page';
import { withApollo } from '../../lib/apollo/init';

const Substance = ({ router }) => {
  const { query } = router;
  if (query && query.name) {
    return <SubstancePage name={query.name} />;
  }
  return null;
};

export default withApollo({ ssr: true })(withRouter(Substance));

import React from 'react';
import PropTypes from 'prop-types';
import TimeMachineWizard from '../../components/TimeMachine/Wizard';
import { withApollo } from '../../lib/apollo/init';

const TimeMachinePage = (props) => {
  return (
    <div>
      <TimeMachineWizard />
    </div>
  );
};

TimeMachinePage.propTypes = {};

export default withApollo({ ssr: true })(TimeMachinePage);

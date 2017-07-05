/*
 *
 * DrugPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectDrugPage from './selectors';
import messages from './messages';

export class DrugPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="DrugPage"
          meta={[
            { name: 'description', content: 'Description of DrugPage' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

DrugPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  DrugPage: makeSelectDrugPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugPage);

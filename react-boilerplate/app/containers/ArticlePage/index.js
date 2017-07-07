/*
 *
 * ArticlePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

export class ArticlePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="ArticlePage"
          meta={[
            { name: 'description', content: 'Description of ArticlePage' },
          ]}
        />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(ArticlePage);

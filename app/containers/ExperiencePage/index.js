/*
 *
 * ExperiencePage
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import makeSelectExperiencePage from './selectors'
import messages from './messages'

export class ExperiencePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="ExperiencePage"
          meta={[
            { name: 'description', content: 'Description of ExperiencePage' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    )
  }
}

ExperiencePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  ExperiencePage: makeSelectExperiencePage(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperiencePage)

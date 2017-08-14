/*
 *
 * ListDrugs
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

export class ListDrugs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    )
  }
}

ListDrugs.propTypes = {
  dispatch: PropTypes.func.isRequired,
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(null, mapDispatchToProps)(ListDrugs)

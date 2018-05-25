/*
 *
 * EditDrugPage
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import makeSelectEditDrugPage from './selectors'
import messages from './messages'

export class EditDrugPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="EditDrugPage"
          meta={[
            { name: 'description', content: 'Description of EditDrugPage' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    )
  }
}

EditDrugPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  EditDrugPage: makeSelectEditDrugPage(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDrugPage)

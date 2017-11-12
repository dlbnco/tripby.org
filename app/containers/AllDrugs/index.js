/*
 *
 * AllDrugs
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import makeSelectAllDrugs from './selectors'
import ListDrugs from '../../components/ListDrugs'
import messages from './messages'
import PageHeader from '../../components/PageHeader'

export class AllDrugs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="AllDrugs"
          meta={[
            { name: 'description', content: 'Description of AllDrugs' },
          ]}
        />
        <PageHeader>
          <FormattedMessage {...messages.header} />
        </PageHeader>
        <section className="py-4">
          <div className="container">
            <ListDrugs limit={20} />
          </div>
        </section>
      </div>
    )
  }
}

AllDrugs.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  AllDrugs: makeSelectAllDrugs(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllDrugs)

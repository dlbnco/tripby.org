/**
*
* ContributionSuccess
*
*/

import React from 'react'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

import messages from './messages'
import Alert from '../Alert'
import FeatherIcon from '../FeatherIcon'

function ContributionSuccess(props) {
  const t = props.params.type
  return (
    <div className="container">
      <section className="py-4 py-md-5">
        <h1 className="mb-4">
          <FormattedMessage {...messages.header} />
        </h1>
        <Alert type="success">
          <h5><FormattedMessage
            {...messages.success}
            values={{
              type: messages[t].defaultMessage,
            }}
          /></h5>
          <Link to={`/${props.params.type}/${props.location.query.id}`}>
            <div className="d-flex align-items-center">
              <FormattedMessage {...messages.action} />
              <span className="ml-1 d-inline-flex"><FeatherIcon icon="arrow-right" size={16} /></span>
            </div>
          </Link>
        </Alert>
      </section>
    </div>
  )
}

ContributionSuccess.propTypes = {
  params: PropTypes.object,
  location: PropTypes.object,
}

export default ContributionSuccess

/**
*
* GateKeeper
*
*/

import React from 'react'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import Alert from '../Alert'
import Auth0 from '../Auth0'

function GateKeeper({ location }) {
  return (
    <Alert type="warning">
      <h2>🙃</h2>
      <h3><FormattedMessage {...messages.header} /></h3>
      <hr />
      <Auth0 location={location} />
    </Alert>
  )
}

GateKeeper.propTypes = {
  location: PropTypes.object,
}

export default GateKeeper

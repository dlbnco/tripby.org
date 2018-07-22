/**
*
* ErrorAlert
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components';
import Alert from '../Alert'
// import { FormattedMessage } from 'react-intl'
import messages from './messages'

function ErrorAlert({ type }) {
  let headerMessage = messages.header.defaultMessage
  let bodyMessage = messages.body.defaultMessage
  let emoji = messages.header.emoji
  if (type) {
    emoji = messages[type].header.emoji
    headerMessage = messages[type].header.defaultMessage
    bodyMessage = messages[type].body.defaultMessage
  }
  return (
    <Alert type="warning">
      <div className="d-flex">
        <h4>
          {emoji}
        </h4>
        <div className="ml-3" style={{ flex: 1 }}>
          <h3>{headerMessage}</h3>
          <p className="mb-0">
            {bodyMessage}
          </p>
          <hr />
          <a href={window.location} className="text-uppercase">
            {messages.body.action}
          </a>
        </div>
      </div>
    </Alert>
  )
}

ErrorAlert.propTypes = {
  type: PropTypes.string,
}

export default ErrorAlert

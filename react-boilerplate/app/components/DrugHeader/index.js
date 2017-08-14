/**
*
* DrugHeader
*
*/

import React from 'react'
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl'
import messages from './messages'

function DrugHeader() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  )
}

DrugHeader.propTypes = {

}

export default DrugHeader

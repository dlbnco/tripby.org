/**
*
* ConnectionError
*
*/

import React from 'react'
// import styled from 'styled-components';
import Alert from '../Alert'
// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

function ConnectionError() {
  return (
    <Alert type="warning">
      <div className="d-flex">
        <h4>
          😿
        </h4>
        <div className="ml-3" style={{ flex: 1 }}>
          <h3>Erro de conexão</h3>
          <p className="mb-0">Não foi possível fazer o corre das informações</p>
          <hr />
          <a href={window.location} className="text-uppercase">Tentar novamente</a>
        </div>
      </div>
    </Alert>
  )
}

ConnectionError.propTypes = {
}

export default ConnectionError

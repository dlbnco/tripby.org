/**
*
* Alert
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components';


function Alert(props) {
  return (
    <div className={`alert alert-${props.type} d-flex`}>
      {props.icon ? <i className="material-icons mr-2">{props.icon}</i> : null}<div style={{ flex: 1 }}>{props.children}</div>
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  icon: PropTypes.string,
}

export default Alert

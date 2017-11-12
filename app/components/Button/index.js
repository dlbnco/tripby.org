/**
*
* Button
*
*/

import React from 'react'
import PropTypes from 'prop-types'


function Button(props) {
  return (
    <button className="btn d-inline-block" onClick={props.onClick}>
      <div className={`d-flex align-items-center ${props.campaign ? 'btn--campaign' : ''} ${props.centered ? 'mx-auto' : ''} ${(props.secondary ? 'btn-secondary' : '')}`}>
        {props.children}
        {props.icon ? <i className="material-icons" style={{ marginLeft: '0.5rem' }} aria-hidden="true">{props.icon}</i> : null}
      </div>
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  campaign: PropTypes.bool,
  icon: PropTypes.string,
  centered: PropTypes.bool,
  secondary: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button

/**
*
* Button
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button(props) {
  const btnClass = classnames({
    btn: true,
    'd-inline-block': true,
    'btn--campaign': props.campaign,
    'btn-secondary': props.secondary,
    'mx-auto': props.centered,
  })
  return (
    <button className={btnClass} onClick={props.onClick}>
      <div className={'d-flex align-items-center'}>
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

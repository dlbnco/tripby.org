/**
*
* Button
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button(props) {
  const btn = classnames({
    btn: true,
    [`btn-${props.style}`]: !props.outline,
    [`btn-outline-${props.style}`]: props.outline,
    'btn-lg': props.large,
    'btn-block': props.block,
  })
  return (
    <button type={props.type} className={btn} onClick={props.onClick ? props.onClick : null} disabled={props.disabled}>
      {props.children}
    </button>
  )
}


Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.string,
  large: PropTypes.bool,
  block: PropTypes.bool,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Button

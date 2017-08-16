/**
*
* Hamburger
*
*/

import React from 'react'
import PropTypes from 'prop-types'


function Hamburger(props) {
  return (
    <button onClick={props.onClick} className={`hamburger hamburger--spin ${(props.navOpened ? 'is-active' : '')}`} type="button">
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  )
}

Hamburger.propTypes = {
  onClick: PropTypes.func,
  navOpened: PropTypes.bool,
}

export default Hamburger

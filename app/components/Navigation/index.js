/**
*
* Navigation
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

function Navigation(props) {
  return (
    <nav className={`nav ${(props.navOpened ? 'nav--visible' : '')}`}>
      <ul>
        <li>
          <Link to="/drugs">Psicoativos</Link>
        </li>
        <li>
          <Link to="/reducao-de-danos">Redução de danos</Link>
        </li>
      </ul>
    </nav>
  )
}

Navigation.propTypes = {
  navOpened: PropTypes.bool,
}

export default Navigation

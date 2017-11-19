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
    <nav className={`nav text-uppercase ${(props.navOpened ? 'nav--visible' : '')}`}>
      <ul className="d-flex align-items-center">
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

import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Navigation = (props) => {
  return (
    <nav className={'nav ' + (props.navOpened ? 'nav--visible' : '')}>
      <ul>
        <li>
          <Link to="/psicoativos">Psicoativos</Link>
        </li>
        <li>
          <Link to="/reducao-de-danos">Redução de danos</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation

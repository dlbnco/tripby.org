/**
*
* LinkButton
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'


function LinkButton(props) {
  return (
    <div className="d-inline-block">
      <Link to={props.link} className={`btn d-flex align-items-center ${props.campaign ? 'btn--campaign' : ''} ${props.centered ? 'mx-auto' : ''} ${(props.secondary ? 'btn-secondary' : '')}`}>
        {props.text}
        {props.icon ? <i className="material-icons" style={{ marginLeft: '0.5rem' }} aria-hidden="true">{props.icon}</i> : null}
      </Link>
    </div>
  )
}

LinkButton.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  campaign: PropTypes.bool,
  icon: PropTypes.string,
  centered: PropTypes.bool,
  secondary: PropTypes.bool,
}

export default LinkButton

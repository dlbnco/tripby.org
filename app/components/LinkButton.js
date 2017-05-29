import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const LinkButton = (props) => {
  return (
    <div className="d-inline-block"><Link to={props.link} className={'btn d-flex align-items-center ' + (props.campaign ? 'btn--campaign' : '') + ' ' + (props.centered ? 'mx-auto' : '') + ' ' + (props.secondary ? 'btn-secondary' : '')}>
      {props.text}
      {props.icon ? <i className="material-icons" style={{marginLeft: '0.5rem'}} aria-hidden="true">{props.icon}</i> : null}
    </Link></div>
  )
}

export default LinkButton

import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const LinkButton = (props) => {
  let arrow = null;
  if (props.arrow) {
    arrow = <i className="material-icons" style={{marginLeft: '0.5rem'}} aria-hidden="true">trending_flat</i>;
  } else arrow = '';
  return (
    <div className="d-inline-block"><Link to={props.link} className={'btn d-flex align-items-center' + ' ' + (props.campaign ? 'btn--campaign' : '') + ' ' + (props.centered ? 'mx-auto' : '')}>
      {props.text}
      {arrow}
    </Link></div>
  )
}

export default LinkButton

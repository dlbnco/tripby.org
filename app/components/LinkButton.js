import React, { PropTypes } from 'react'

const LinkButton = (props) => {
  let arrow = null;
  if (props.arrow) {
    arrow = <i className="material-icons" style={{marginLeft: '0.5rem'}} aria-hidden="true">trending_flat</i>;
  } else arrow = '';
  return (
    <a href={props.link} className={'btn d-flex align-items-center' + ' ' + (props.campaign ? 'btn--campaign' : '') + ' ' + (props.centered ? 'mx-auto' : '')}>
      {props.text}
      {arrow}
    </a>
  )
}

export default LinkButton

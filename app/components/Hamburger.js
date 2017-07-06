import React from 'react'

const Hamburger = (props) => {
  return (
    <button onClick={props.onClick} className={"hamburger hamburger--spin " + (props.navOpened ? 'is-active' : '')} type="button">
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  )
}

export default Hamburger

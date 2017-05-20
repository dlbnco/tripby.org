import React, { PropTypes } from 'react'
import main from '../assets/styles/main.scss'
import LinkButton from './LinkButton'

const FeaturedContent = (props) => {
  const sectionStyle = {
    background: '#eeeeee'
  }
  const textStyle = {
    color: '#7e7e7e'
  }
  return (
    <section style={sectionStyle}>
      <div className="d-flex" style={{position: 'relative'}}>
      <div className="container">
        <div className="row">
          <div className="section col-12 col-md-5 d-flex flex-column justify-content-center align-items-baseline">
            <h2 className="text-uppercase"><strong style={textStyle}>{props.tagline}</strong></h2>
            <p style={textStyle}>{props.subtagline}</p>
            {props.children}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end" style={{position: 'absolute', right: 0, bottom: 0}}>
        <img src={require('../assets/img/illustrations/tryptamines.png')} style={{opacity: 0.4, zoom: 0.5, width: 260, height: 360, transform: 'rotate(180deg) scaleX(-1)'}}/>
      </div>
      </div>
    </section>
  )
}

export default FeaturedContent

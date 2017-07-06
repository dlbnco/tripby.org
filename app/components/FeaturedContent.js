import React from 'react'
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
      <div className="container">
        <div className="row">
          <div className="section col-12 col-md-5 d-flex flex-column justify-content-center align-items-baseline">
            <h2 className={"text-uppercase" + (!props.subtagline ? ' mb-0' : '')}><strong style={textStyle}>{props.tagline}</strong></h2>
            <p style={textStyle}>{props.subtagline}</p>
            {props.children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedContent

import React, { PropTypes } from 'react'
import Router from 'react-router'

class Page extends React.Component{
  render () {
    return (
      <section className="section section--pattern--light">
        <div className="container">
          <h1 className="tbBlue-text section--pageHeader__text">{this.props.params.pageID}</h1>
        </div>
      </section>
    )
  }
}

export default Page

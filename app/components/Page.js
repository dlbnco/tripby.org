import React from 'react'
import Router from 'react-router'

class Page extends React.Component{
  render () {
    return (
      <div>
        <section className="section">
          <div className="container">
            <h1 className="tbBlue-text section--pageHeader__text">{this.props.params.page}</h1>
          </div>
        </section>
      </div>
    )
  }
}

export default Page

import React, { PropTypes } from 'react'
import Home from './Home'

const App = React.createClass({
  render () {
    return (
      <div>
        <header>
          <h1>Headerzino</h1>
        </header>
        {this.props.children}
      </div>
    )
  }
})

export default App

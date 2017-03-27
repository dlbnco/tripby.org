import React, { PropTypes } from 'react'
import Home from './Home'

const App = React.createClass({
  render () {
    return (
      <div>
        <header>

        </header>
        {this.props.children}
      </div>
    )
  }
})

export default App

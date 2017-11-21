/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    location: PropTypes.object,
  };

  render() {
    return (
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <Header location={this.props.location} />
        <div style={{ flex: 1 }} className="d-flex flex-column">
          {React.Children.toArray(this.props.children)}
        </div>
        <Footer />
      </div>
    )
  }
}

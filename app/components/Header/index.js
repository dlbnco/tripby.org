/**
*
* Header
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import logo from '../../assets/img/logos/logo.svg'
import Hamburger from '../Hamburger'
import Navigation from '../Navigation'
import Auth0 from '../Auth0'

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.handleNav = this.handleNav.bind(this)
    this.state = {
      navOpened: false,
    }
  }
  handleNav() {
    this.setState({
      navOpened: !this.state.navOpened,
    })
    document.body.classList.toggle('prevent-scroll')
  }
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex" style={{ flex: 1 }}>
              <div className="d-flex d-md-none align-items-center mr-3">
                <Hamburger onClick={this.handleNav} navOpened={this.state.navOpened} />
              </div>
              <Link to="/"><img role="presentation" src={logo} className="logo" /></Link>
              <div className={'ml-md-5 d-flex justify-content-end'}>
                <Navigation navOpened={this.state.navOpened} />
              </div>
            </div>
            <div className="ml-3">
              <Auth0 location={this.props.location} />
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object,
}

export default Header

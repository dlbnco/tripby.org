/**
*
* Header
*
*/

import React from 'react'
import { Link } from 'react-router'
import logo from '../../assets/img/logos/logo.svg'
import Hamburger from '../Hamburger'
import Navigation from '../Navigation'

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
  }
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="row flex-wrap align-items-center">
            <div className="col-4 col-sm-4 hidden-md-up d-flex align-items-center">
              <Hamburger onClick={this.handleNav} navOpened={this.state.navOpened} />
            </div>
            <div className="col-4 col-sm-4 col-md-2">
              <Link to="/"><img role="presentation" src={logo} className="logo" /></Link>
            </div>
            <div className={`"col-12 col-sm-12 col-md-10 d-flex justify-content-end ${(this.state.navOpened ? '' : 'hidden-md-down')}`}>
              <Navigation navOpened={this.state.navOpened} />
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {

}

export default Header

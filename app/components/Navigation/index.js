/**
*
* Navigation
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classnames from 'classnames'

import FeatherIcon from '../FeatherIcon'
import Hamburger from '../Hamburger'
import Auth0 from '../Auth0'

const logo = require('../../assets/img/logos/logo.svg')

class Navigation extends React.Component {
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
    const navClasses = classnames({
      'd-none': !this.state.navOpened,
      'd-md-block': true,
    })
    const items = [
      {
        label: 'Psicoativos',
        link: '/drugs',
        icon: 'loader',
      },
      {
        label: 'Artigos',
        link: '/articles',
        icon: 'book',
      },
      {
        label: 'Pesquisar',
        link: '/search',
        icon: 'search',
      },
    ]
    return (
      <div className="header py-3 py-md-4">
        <div className="container"><div className="d-flex align-items-center justify-content-between">
          <Link to="/"><img src={logo} alt="TRIPBY" className="logo mb-0 mb-md-5" /></Link>
          <div className="d-inline-flex">
            <Link to="/search">
              <div className="d-md-none text-uppercase mr-2">
                <FeatherIcon icon="search" size={24} />
              </div>
            </Link>
            <span className="d-md-none"><Hamburger onClick={this.handleNav} navOpened={this.state.navOpened} /></span>
          </div>
        </div>
          <nav className={navClasses}>
            <ul className="nav flex-column">
              {items.map((item) =>
                <li>
                  <Link to={item.link} onClick={() => this.setState({ navOpened: false })}>
                    <div className="d-flex align-items-center">
                      <span className="mr-2 d-inline-flex align-items-center">
                        <FeatherIcon icon={item.icon} size={24} />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  </Link>
                </li>
            )}
              <li><Auth0 location={this.props.location} /></li>
            </ul>
          </nav></div>
      </div>
    )
  }
}

Navigation.propTypes = {
  location: PropTypes.object,
}

export default Navigation

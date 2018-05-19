/**
*
* Auth0
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import auth0 from 'auth0-js'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import setUser from './actions'
import messages from './messages'
import FeatherIcon from '../FeatherIcon'


class Auth0 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    const auth = new auth0.WebAuth({
      domain: 'tripby.auth0.com',
      clientID: 'dxItVoNZ8RL7g_SC26qXKLJzlgywHPYp',
      redirectUri: process.env.NODE_ENV === 'production' ? `http://${process.env.DOMAIN}/authorize` : 'http://localhost:3000/authorize',
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
    this.auth = auth
    this.login = this.login.bind(this)
    this.parseHash = this.parseHash.bind(this)
  }
  componentDidMount() {
    if (localStorage.userId) {
      this.checkUser(localStorage.userId)
    } else if (this.props.location.pathname === '/authorize' && this.props.location.hash) {
      this.parseHash()
    }
  }
  componentDidUpdate(prevProps) {
    const user = this.props.data.User
    if (user && prevProps.data.User !== user && user.id) {
      this.props.dispatch(setUser(user.id))
    }
  }
  login() {
    localStorage.pathname = this.props.location.pathname
    this.auth.authorize()
  }
  createUser(idToken, email) {
    this.props.mutate({
      refetchQueries: [
        'checkUser',
      ],
      variables: {
        idToken,
        email,
      },
    })
  }
  checkUser(userId) {
    this.props.data.refetch({
      userId,
    }).then((response) => {
      if (!response.data.User) {
        this.createUser(this.state.authResult.idToken, this.state.authResult.idTokenPayload.email)
      } else {
        this.props.data.updateQuery({ variables: { userId } })
      }
    }).then(() => {
      if (localStorage.pathname) {
        browserHistory.push(localStorage.pathname)
        localStorage.removeItem('pathname')
      }
    })
  }
  parseHash() {
    this.auth.parseHash({
      hash: this.props.location.hash,
    }, (err, authResult) => {
      if (err) {
        this.setState({
          err,
        })
      }
      localStorage.token = authResult.idToken
      localStorage.userId = authResult.idTokenPayload.user_id
      this.setState({
        authResult,
      }, () => {
        this.checkUser(authResult.idTokenPayload.user_id)
      })
    })
  }
  render() {
    return (
      <div>
        {!this.props.data.User ? (
          <a href="#!" onClick={this.login}>
            {this.props.data.loading ? '...' : (<div className="d-flex align-items-center"><span className="d-inline-flex mr-2"><FeatherIcon icon="log-in" size="24" /></span><span>{messages.auth.login}</span></div>)}
          </a>
        ) : (
          <div>
            <span className="d-inline-flex mr-2"><FeatherIcon icon="user" size="24" /></span>
            Logado como {this.props.data.User.id}
          </div>
        )}
      </div>
    )
  }
}

Auth0.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  mutate: PropTypes.func,
  dispatch: PropTypes.func,
}

const createUser = gql`
mutation createUser($idToken: String!, $email: String!) {
  createUser (
    authProvider: {
      auth0: {
        idToken: $idToken
      }
    },
    email: $email
  ) {
    id
  }
}
`

const checkUser = gql`
  query checkUser($userId: String!) {
    User(auth0UserId: $userId) {
      id
    }
  }
`

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default compose(graphql(createUser), graphql(checkUser, { options: { variables: { userId: localStorage.userId || '' } } }))(connect(null, mapDispatchToProps)(Auth0))

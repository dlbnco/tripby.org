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
import messages from './messages'
import Button from '../Button'


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
    if (this.props.location.pathname === '/authorize' && this.props.location.hash) {
      this.parseHash()
    }
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
      this.setState({
        authResult,
      }, () => {
        this.checkUser(authResult.idTokenPayload.user_id)
      })
    })
  }
  checkUser(userId) {
    this.props.data.refetch({
      userId,
    }).then((response) => {
      if (!response.data.User) {
        this.createUser(this.state.authResult.idToken)
      }
    })
  }
  createUser(idToken) {
    this.props.mutate({
      refetchQueries: [
        'checkUser',
      ],
      variables: {
        idToken,
      },
    })
  }
  login() {
    this.auth.authorize()
  }
  render() {
    return (
      <div>
        {this.props.data.User ? (
          <div>
            Logado como {this.props.data.User.id}
          </div>
        ) : (
          <Button secondary onClick={this.login} type="primary">{messages.auth.login}</Button>
        )}
      </div>
    )
  }
}

Auth0.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  mutate: PropTypes.func,
}

const createUser = gql`
mutation createUser($idToken: String!) {
  createUser (
    authProvider: {
      auth0: {
        idToken: $idToken
      }
    }
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

export default compose(graphql(createUser), graphql(checkUser, { options: { variables: { userId: '' } } }))(Auth0)

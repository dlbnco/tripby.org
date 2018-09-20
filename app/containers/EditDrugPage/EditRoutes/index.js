import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Drug as GET_DRUG, GET_ROUTE_TYPES } from '..'
import Dosage from './Dosage'
import Duration from './Duration'

const CREATE_ROUTE = gql`
  mutation createRoute(
    $type: Routes!
    $drugId: ID!
  ) {
    createRoute(
      type: $type
      drugId: $drugId
    ) {
      id
    }
  }
`

export default class EditRoutes extends Component {
  static propTypes = {
    Drug: PropTypes.object.isRequired,
  }
  state = {
    collapsed: [],
  }
  handleRouteCollapse(id) {
    const { collapsed } = this.state
    const index = collapsed.indexOf(id)
    if (index >= 0) {
      collapsed.splice(index, 1)
    } else {
      collapsed.push(id)
    }
    this.setState({ collapsed })
  }
  handleCreateRoute(e, createRoute) {
    e.preventDefault()
    const { Drug } = this.props
    const type = e.target.route.value
    const variables = {
      drugId: Drug.id,
      type,
    }
    createRoute({ variables })
  }
  render() {
    const { Drug } = this.props
    const { routes } = Drug
    const { collapsed } = this.state
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item">
            <Mutation
              mutation={CREATE_ROUTE}
              refetchQueries={() => [
                { query: GET_DRUG, variables: { id: Drug.id } },
              ]}
            >
              {(createRoute, { data, loading, error }) => (
                <form
                  className="d-flex align-items-center"
                  onSubmit={(e) => this.handleCreateRoute(e, createRoute)}
                >
                  <Query query={GET_ROUTE_TYPES}>
                    {({ data }) => ( // eslint-disable-line
                      <select name="route" className="form-control mr-3">
                        {data && data.__type.enumValues.filter((routeType) => // show only routes that doesn't exist yet in this Drug
                        Drug.routes.find((route) =>
                          route.type === routeType.name) === undefined)
                            .map((routeType) => (
                              <option value={routeType.name}>
                                {routeType.name}
                              </option>
                        ))}
                      </select>
                    )}
                  </Query>
                  <button
                    className="btn btn-small"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Add route'}
                  </button>
                  {!loading &&
                    data &&
                    data.createRoute.id &&
                    (<div className="ml-2">Created!</div>)}
                  {error && 'error'}
                </form>)}
            </Mutation>
          </li>
          {routes.map((route) => {
            const isCollapsed = collapsed.includes(route.id)
            return (
              <li className="list-group-item">
                <button
                  className="w-100 d-flex align-items-center justify-content-between"
                  onClick={() => this.handleRouteCollapse(route.id)}
                >
                  {route.type}
                  <ChevronDown
                    className="transition cursor-pointer"
                    style={{
                      transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                    onClick={() => this.handleRouteCollapse(route.id)}
                  />
                </button>
                <Collapse isOpen={isCollapsed}>
                  <Dosage Drug={Drug} route={route} />
                  <Duration Drug={Drug} route={route} />
                </Collapse>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

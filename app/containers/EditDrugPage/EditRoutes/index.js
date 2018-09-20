import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import messages from '../messages'
import { Drug as GET_DRUG } from '..'

const UPDATE_ROUTE_DOSAGE = gql`
  mutation updateDosage(
    $id: ID!
    $treshold: Int
    $light: Json
    $common: Json
    $strong: Json
    $heavy: Int
  ) {
    updateDosage(
      id: $id
      treshold: $treshold
      light: $light
      common: $common
      strong: $strong
      heavy: $heavy
    ) {
      id
    }
  }
`

const dosageLevels = [
  'treshold',
  'light',
  'common',
  'strong',
  'heavy',
]

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
  handleUpdateDosage(dosageId, e, updateDosage) {
    e.preventDefault()
    const { target } = e
    const payload = {
      id: dosageId,
      treshold: Number(target['treshold-min'].value),
      light: {
        min: target['light-min'].value,
        max: target['light-max'].value,
      },
      common: {
        min: target['common-min'].value,
        max: target['common-max'].value,
      },
      strong: {
        min: target['strong-min'].value,
        max: target['strong-max'].value,
      },
      heavy: Number(target['heavy-min'].value),
    }
    updateDosage({ variables: payload })
  }
  render() {
    const { Drug } = this.props
    const { routes } = Drug
    const { collapsed } = this.state
    return (
      <div>
        <ul className="list-group">
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
                  {route.dosage ? <Mutation
                    refetchQueries={() => [
                      { query: GET_DRUG, variables: { id: Drug.id } },
                    ]}
                    mutation={UPDATE_ROUTE_DOSAGE}
                  >
                    {(updateDosage, { data, loading, error }) => (
                      <form
                        className="py-3"
                        onSubmit={(e) => this.handleUpdateDosage(route.dosage.id, e, updateDosage)}
                      >
                        <h6>
                          <strong>
                        Dosage
                      </strong>
                        </h6>
                        {dosageLevels.map((level) => (
                          <div className="row align-items-center justify-content-between my-2">
                            <div className="col-8">
                              {messages.sections.routes.dosage[level]}
                            </div>
                            <div className="col-4 d-flex">
                              <input
                                className="form-control"
                                type="number"
                                name={`${level}-min`}
                                placeholder="min"
                                defaultValue={route.dosage && route.dosage[level] && (route.dosage[level].min || route.dosage[level])}
                              />
                              {level !== 'treshold' && level !== 'heavy' && (
                              <input
                                className={'ml-2 form-control'}
                                name={`${level}-max`}
                                placeholder="max"
                                type="number"
                                defaultValue={route.dosage && route.dosage[level] && route.dosage[level].max}
                              />
                            )}
                            </div>
                            <small className="text-muted"></small>
                          </div>
                        ))}
                        <div className="d-flex align-items-center mt-3">
                          <button
                            className="btn btn-small"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? 'Updating...' : 'Update'}
                          </button>
                          {!loading &&
                            data &&
                            data.updateDosage.id &&
                            (<div className="ml-2">Updated!</div>)}
                          {error && 'error'}
                        </div>
                      </form>
                  )}
                  </Mutation> : (
                    <div>
                      Create dosage
                    </div>
                  )}
                </Collapse>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

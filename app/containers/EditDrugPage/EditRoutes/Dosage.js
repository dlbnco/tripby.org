import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Drug as GET_DRUG } from '..'

import messages from '../messages'

const CREATE_ROUTE_DOSAGE = gql`
  mutation createDosage(
    $routeId: ID!
  ) {
    createDosage(
      routeId: $routeId
    ) {
      id
    }
  }
`

const UPDATE_ROUTE_DOSAGE = gql`
  mutation updateDosage(
    $id: ID!
    $treshold: Float
    $light: Json
    $common: Json
    $strong: Json
    $heavy: Float
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

export default class Dosage extends Component {
  static propTypes = {
    Drug: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
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
    const { Drug, route } = this.props
    return (
      <div>
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
                  {messages.sections.routes.dosage.title}
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
                      step="0.001"
                      name={`${level}-min`}
                      placeholder="min"
                      defaultValue={route.dosage && route.dosage[level] && (route.dosage[level].min || route.dosage[level])}
                    />
                    {level !== 'treshold' && level !== 'heavy' && (
                      <input
                        className={'ml-2 form-control'}
                        name={`${level}-max`}
                        step="0.001"
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
          <Mutation
            mutation={CREATE_ROUTE_DOSAGE}
            refetchQueries={() => [
                        { query: GET_DRUG, variables: { id: Drug.id } },
            ]}
          >
            {(createDosage, { loading, error }) => (
              <div>
                <button
                  onClick={() => createDosage({
                    variables: { routeId: route.id },
                  })} className="btn btn-small my-3"
                >
                  {loading ? 'Creating...' : 'Create dosage'}
                </button>
                {error && (<div>error</div>)}
              </div>
                      )}
          </Mutation>
                  )}
      </div>
    )
  }}


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Drug as GET_DRUG } from '..'

import messages from '../messages'
import { durationTimeframes } from '../../../constants'

const CREATE_ROUTE_DURATION = gql`
  mutation createDuration(
    $routeId: ID!
  ) {
    createDuration(
      routeId: $routeId
    ) {
      id
    }
  }
`

const UPDATE_ROUTE_DURATION = gql`
  mutation updateDuration(
    $id: ID!
    $onset: Json
    $comeUp: Json
    $peak: Json
    $comeDown: Json
    $total: Json
    $afterEffects: Json
  ) {
    updateDuration(
      id: $id
      onset: $onset
      comeUp: $comeUp
      peak: $peak
      comeDown: $comeDown
      total: $total
      afterEffects: $afterEffects
    ) {
      id
    }
  }
`

export default class Duration extends Component {
  static propTypes = {
    Drug: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }
  handleUpdateDuration(durationId, e, updateDuration) {
    e.preventDefault()
    const { target } = e
    const payload = {
      id: durationId,
      onset: {
        min: target['onset-min'].value,
        max: target['onset-max'].value,
      },
      comeUp: {
        min: target['comeUp-min'].value,
        max: target['comeUp-max'].value,
      },
      peak: {
        min: target['peak-min'].value,
        max: target['peak-max'].value,
      },
      comeDown: {
        min: target['comeDown-min'].value,
        max: target['comeDown-max'].value,
      },
      total: {
        min: target['total-min'].value,
        max: target['total-max'].value,
      },
      afterEffects: {
        min: target['afterEffects-min'].value,
        max: target['afterEffects-max'].value,
      },
    }
    updateDuration({ variables: payload })
  }
  render() {
    const { Drug, route } = this.props
    return (
      <div>
        {route.duration ? <Mutation
          refetchQueries={() => [
                      { query: GET_DRUG, variables: { id: Drug.id } },
          ]}
          mutation={UPDATE_ROUTE_DURATION}
        >
          {(updateDuration, { data, loading, error }) => (
            <form
              className="py-3"
              onSubmit={(e) => this.handleUpdateDuration(route.duration.id, e, updateDuration)}
            >
              <h6>
                <strong>
                  {messages.sections.routes.duration.title}
                </strong>
              </h6>
              {durationTimeframes.map((timeframe) => (
                <div className="row align-items-center justify-content-between my-2">
                  <div className="col-8">
                    {messages.sections.routes.duration[timeframe]}
                  </div>
                  <div className="col-4 d-flex">
                    <input
                      className="form-control"
                      type="number"
                      name={`${timeframe}-min`}
                      placeholder="min"
                      defaultValue={route.duration && route.duration[timeframe] && (route.duration[timeframe].min)}
                    />
                    <input
                      className={'ml-2 form-control'}
                      name={`${timeframe}-max`}
                      placeholder="max"
                      type="number"
                      defaultValue={route.duration && route.duration[timeframe] && route.duration[timeframe].max}
                    />
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
                            data.updateDuration.id &&
                            (<div className="ml-2">Updated!</div>)}
                {error && 'error'}
              </div>
            </form>
                  )}
        </Mutation> : (
          <Mutation
            mutation={CREATE_ROUTE_DURATION}
            refetchQueries={() => [
                        { query: GET_DRUG, variables: { id: Drug.id } },
            ]}
          >
            {(createDuration, { loading, error }) => (
              <div>
                <button
                  onClick={() => createDuration({
                    variables: { routeId: route.id },
                  })} className="btn btn-small my-3"
                >
                  {loading ? 'Creating...' : 'Create duration'}
                </button>
                {error && (<div>error</div>)}
              </div>
                      )}
          </Mutation>
                  )}
      </div>
    )
  }}


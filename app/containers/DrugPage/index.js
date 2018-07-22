/*
*
* DrugPage
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { createStructuredSelector } from 'reselect'

import makeSelectDrugPage from './selectors'
import Spinner from '../../components/Spinner'
import ErrorAlert from '../../components/ErrorAlert'
import DrugHeader from '../../components/DrugHeader'
import DrugBody from '../../components/DrugBody'

export class DrugPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.handleTabs = this.handleTabs.bind(this)
    this.state = {
      colorScheme: [],
      loading: true,
      error: null,
    }
  }
  theDrug() {
    if (this.props.data.loading && this.state.error == null) {
      return (
        <Spinner className="mx-auto" />
      )
    } else if (this.props.data.error) {
      return (
        <ErrorAlert />
      )
    } return (
      <div className="py-4">
        <div className="container">
          {!this.props.data.error ? (
            <div className="row">
              <div className="col-12 col-lg-4">
                <DrugHeader
                  handleTabs={this.handleTabs}
                  name={this.props.data.Drug.name}
                  aliases={this.props.data.Drug.aliases}
                  classes={this.props.data.Drug.classes}
                  routes={this.props.data.Drug.routes}
                  molecules={this.props.data.Drug.molecules}
                  alerts={this.props.data.Drug.alerts}
                  id={this.props.data.Drug.id}
                />
              </div>
              <div className="col-12 col-lg-8 mt-3">
                <DrugBody drug={this.props.data.Drug} params={this.props.params} />
              </div>
            </div>
            ) : (
              <ErrorAlert />
            )}
        </div>
      </div>
    )
  }
  /* eslint-disable react/no-danger */

  handleTabs(tab) {
    this.setState({ selectedTab: tab })
  }
  render() {
    return (
      <div style={{ flex: 1 }}>
        <Helmet>
          <title>{this.props.data.loading ? 'TRIPBY' : `${this.props.data.Drug.name} – efeitos, duração, dose, saúde e lei`}</title>
        </Helmet>
        {this.theDrug()}
      </div>
    )
  }

}

const Drug = gql`
  query($id: ID!) {
    Drug(id: $id) {
      id
      name
      alerts
      aliases
      health
      law
      experiences {
        id
        title
        drugs {
          id
          name
        }
      }
      effects {
        name
      }
      classes {
        id
        title
      }
      routes {
        id
        type
        durations {
          min
          max
          timeframe
        }
        dosage {
          treshold
          light
          common
          strong
          heavy
        }
      }
      molecules {
        url
      }
      summary
    }
  }
`

DrugPage.propTypes = {
  data: PropTypes.object,
  params: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  DrugPage: makeSelectDrugPage(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default graphql(Drug, { options: ({ params }) => ({ variables: { id: params.drug } }) })(connect(mapStateToProps, mapDispatchToProps)(DrugPage))

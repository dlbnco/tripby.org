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
import { TabGroup, Tab } from 'material-tabs'
import { createStructuredSelector } from 'reselect'
import makeSelectDrugPage from './selectors'
import Spinner from '../../components/Spinner'
import DrugHeader from '../../components/DrugHeader'

const tabStyle = {
  color: '#ee6e73',
  fontWeight: 500,
}

export class DrugPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.handleTabs = this.handleTabs.bind(this)
    this.state = {
      drugObject: {
        title: {
          rendered: '',
        },
      },
      colorScheme: [],
      selectedTab: 0,
      loading: true,
      error: null,
    }
  }
  theDrug() {
    if (this.props.data.loading && this.state.error == null) {
      return (
        <Spinner className="mx-auto" />
      )
    } else if (this.state.error !== null) {
      return (
        <div className="col text-center">
          😥<br />{this.state.error}
        </div>
      )
    } return (
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <DrugHeader
                handleTabs={this.handleTabs}
                drugName={this.props.data.Drug.name}
                drugAliases={this.props.data.Drug.aliases}
                drugClass={this.props.data.Drug.class}
                drugRoutes={this.props.data.Drug.routes}
                drugMolecules={this.props.data.Drug.molecules}
              />
            </div>
            <div className="col-12 col-lg-8 mt-3">
              <div className="card" style={{ borderRadius: '4px' }}>
                <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                  <div style={{ minWidth: 480, margin: '0 auto' }}>
                    <TabGroup style={{ indicator: { backgroundColor: '#f6b2b5' } }} onChangeTab={this.handleTabs}>
                      <Tab style={tabStyle}>
                        Sumário
                      </Tab>
                      <Tab style={tabStyle}>
                        Efeitos
                      </Tab>
                      <Tab style={tabStyle}>
                        Dosagem
                      </Tab>
                      <Tab style={tabStyle}>
                        Saúde
                      </Tab>
                      <Tab style={tabStyle}>
                        Lei
                      </Tab>
                      <Tab style={tabStyle}>
                        + Info
                      </Tab>
                    </TabGroup>
                  </div>
                </div>
                <div className="card-body">
                  <p>{this.props.data.Drug.summary}</p>
                  <h2>Efeitos</h2>
                  {this.props.data.Drug.effectsExcerpt || (<div className="text-grey">Ainda sem sumário de efeitos</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  /* eslint-disable react/no-danger */

  handleTabs(event) {
    this.setState({ selectedTab: event })
  }
  render() {
    return (
      <div style={{ flex: 1 }} className="bg-blueLighter">
        <Helmet>
          <title>{this.state.loading ? 'TRIPBY' : `${this.props.data.Drug.name} – efeitos, duração, dose, saúde e lei`}</title>
        </Helmet>
        {this.theDrug()}
      </div>
    )
  }

}

const Drug = gql`
  query($id: ID!) {
    Drug(id: $id) {
      name
      aliases
      class {
        id
        title
      }
      routes {
        name
      }
      molecules {
        url
      }
      summary
      effectsExcerpt
    }
  }
`

DrugPage.propTypes = {
  data: PropTypes.object,
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

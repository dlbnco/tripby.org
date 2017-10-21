/*
*
* DrugPage
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Helmet from 'react-helmet'
import { TabGroup, Tab } from 'material-tabs'
import { createStructuredSelector } from 'reselect'
import makeSelectDrugPage from './selectors'
import Spinner from '../../components/Spinner'
import DrugHeader from '../../components/DrugHeader'
import client from '../../client'

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
  componentDidMount() {
    const name = this.props.params.drug
    client.query(`
      {
        Drug (name: "${name}") {
          name
          aliases
          class {
            title
          }
          routes {
            name
          }
          summary
          effectsExcerpt
        }
      }
      `).then((response) => {
        const drug = response.Drug
        this.setState({
          drug,
          loading: false,
        })
      })
  }
  theDrug() {
    if (this.state.loading && this.state.error == null) {
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
      <div style={{ backgroundColor: 'rgb(224, 247, 250)' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <DrugHeader
                handleTabs={this.handleTabs}
                drugName={this.state.drug.name}
                drugNicknames={this.state.drug.aliases}
                drugClass={this.state.drug.class.title}
                drugRoutes={this.state.drug.routes}
                drugMolecule={this.state.drug.molecule}
              />
            </div>
            <div className="col-12 col-lg-8 card mt-3" style={{ borderRadius: '4px' }}>
              <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                <div style={{ minWidth: 480, margin: '0 auto' }}>
                  <TabGroup style={{ indicator: { backgroundColor: '#f6b2b5' } }} onChangeTab={this.handleTabs}>
                    <Tab style={tabStyle}>
                      Básico
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
                <p>{this.state.drug.summary}</p>
                <div className="row">
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="text-uppercase">Efeitos</h4>
                        {this.state.drug.effectsExcerpt}
                      </div>
                      <div className="card-footer">
                        Mais
                      </div>
                    </div>
                  </div>
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
      <div style={{ flex: 1 }}>
        <Helmet>
          <title>{this.state.loading ? 'TRIPBY' : `${this.state.drug.name} – efeitos, duração, dose, saúde e lei`}</title>
        </Helmet>
        {this.theDrug()}
      </div>
    )
  }

}

DrugPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DrugPage)

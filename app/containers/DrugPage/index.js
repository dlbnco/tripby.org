/*
*
* DrugPage
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { TabGroup, Tab } from 'material-tabs'
import { createStructuredSelector } from 'reselect'
import Markdown from 'react-markdown'
import makeSelectDrugPage from './selectors'
import Spinner from '../../components/Spinner'
import DrugHeader from '../../components/DrugHeader'

const tabStyle = {
  color: '#ee6e73',
  fontWeight: 500,
  whiteSpace: 'nowrap',
}

const tabs = [
  { link: 'overview', label: 'Visão geral' },
  { link: 'effects', label: 'Efeitos' },
  { link: 'health', label: 'Saúde' },
  { link: 'law', label: 'Lei' },
  { link: 'experiences', label: 'Experiências' },
]

export class DrugPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.handleTabs = this.handleTabs.bind(this)
    this.state = {
      colorScheme: [],
      loading: true,
      error: null,
    }
    this.tabSwitch = this.tabSwitch.bind(this)
  }
  tabSwitch() {
    const drug = this.props.data.Drug
    switch (this.props.params.tab) {
      case 'overview':
        return (
          <Markdown source={drug.summary} />
        )
      case 'effects':
        return (
            drug.effects.length > 0 ? (
              'efeitoss'
            ) : (
              <div>+ Adicionar efeitos</div>
            )
        )
      case 'health':
        return (
          drug.health ? (
            <Markdown source={drug.health} />
          ) : (
            <div>+ Adicionar saúde</div>
          )
        )
      case 'law':
        return (
            drug.law ? (
              <Markdown source={drug.law} />
            ) : (
              <div>+ Adicionar lei</div>
            )
        )
      case 'experiences':
        return (
              drug.experiences.length > 0 ? (
                <div>experiências aqui</div>
              ) : (
                <div>+ Postar experiência com {drug.name}</div>
              )
        )
      default:
        return (
          <Markdown source={this.props.data.Drug.summary} />
        )
    }
  }
  mapTabs() {
    return tabs.map((tab, index) => (
      <Link to={`/drugs/${this.props.params.drug}/${tab.link}`} key={index}>
        <Tab style={tabStyle}>
          {tab.label}
        </Tab>
      </Link>
      ))
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
                alerts={this.props.data.Drug.alerts}
              />
            </div>
            <div className="col-12 col-lg-8 mt-3">
              <div className="card" style={{ borderRadius: '4px', border: 0 }}>
                <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                  <div style={{ minWidth: 480, margin: '0 auto' }}>
                    <TabGroup defaultSelectedTab={tabs.findIndex((tab) => tab.link === this.props.params.tab)} style={{ indicator: { backgroundColor: '#f6b2b5' } }} onChangeTab={this.handleTabs}>
                      {this.mapTabs()}
                    </TabGroup>
                  </div>
                </div>
                <div className="card-body">
                  {this.tabSwitch()}
                </div>
              </div>
            </div>
          </div>
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
      <div style={{ flex: 1 }} className="bg-blueLighter">
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
      name
      alerts
      aliases
      health
      law
      experiences {
        title
      }
      effects {
        name
      }
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

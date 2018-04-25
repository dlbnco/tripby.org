/**
*
* DrugBody
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import { TabGroup, Tab } from 'material-tabs'
import Alert from '../../components/Alert'

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

class DrugBody extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.tabSwitch = this.tabSwitch.bind(this)
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
  tabSwitch() {
    const drug = this.props.drug
    switch (this.props.params.tab) {
      case 'overview':
        return (
          <Markdown source={drug.summary} />
        )
      case 'effects':
        return (
            drug.effects.length > 0 ? (
              <div>
                <Alert icon="info_outline" type="info">Os efeitos listados abaixo raramente (ou nunca) ocorrerão de uma só vez, mas doses maiores aumentarão as chances e são mais propensas a induzir uma gama completa de efeitos.</Alert>
                <ul className="p-0 list-unstyled row">
                  {drug.effects.map((effect, index) => (
                    <li key={index} className="col-12 col-md-4">
                      <div className="card">
                        <div className="p-3">
                          <div className="d-flex align-items-center">
                            <h5 style={{ flex: 1 }}>{effect.name}</h5>
                            <div className="d-flex flex-column">
                              <i className="material-icons">keyboard_arrow_up</i>
                              <i className="material-icons">keyboard_arrow_down</i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
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
          <Markdown source={drug.summary} />
        )
    }
  }
  render() {
    return (
      <div className="card" style={{ borderRadius: '4px' }}>
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
    )
  }
}

DrugBody.propTypes = {
  drug: PropTypes.object,
  params: PropTypes.object,
}

export default DrugBody

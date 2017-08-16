/**
*
* DrugHeader
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { TabGroup, Tab } from 'material-tabs'

function DrugHeader(props) {
  const tabStyle = {
    color: '#ee6e73',
    fontWeight: 500,
  }
  return (
    <div>
      <section className="section pb-0" style={{ backgroundColor: '#E0F7FA', color: '#424242' }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="text-uppercase"><strong>{props.drugName}</strong></h1>
              ou
              <p><em>{props.drugNicknames}</em></p>
              <div className="badge badge-pill mb-3">
                <span className="text-uppercase"><strong>{props.drugClass}</strong></span>
              </div>
              <p className="text-uppercase mb-0"><strong>Vias de administração</strong></p>
              <p>{props.drugRoutes}</p>
            </div>
            <div className="col col-md-4 col-lg-3">
              <img src={props.drugMolecule} role="presentation" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
        <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
          <div style={{ minWidth: 480, margin: '0 auto' }} className="container">
            <TabGroup style={{ indicator: { backgroundColor: '#f6b2b5' } }} onChangeTab={props.handleTabs}>
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
      </section>
    </div>
  )
}

DrugHeader.propTypes = {
  drugName: PropTypes.string,
  drugClass: PropTypes.string,
  drugNicknames: PropTypes.string,
  drugRoutes: PropTypes.string,
  drugMolecule: PropTypes.string,
  handleTabs: PropTypes.func,
}

export default DrugHeader

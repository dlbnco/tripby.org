/**
*
* DrugHeader
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'reactstrap'
import Alert from '../Alert'

class DrugHeader extends React.Component {
  componentWillMount() {
    const routes = {}
    this.props.routes.map((route) => { routes[route.id] = false }) //eslint-disable-line
    this.setState({ routes })
  }
  render() {
    return (
      <div>
        <section className="pt-3 pb-0">
          <div className="row align-items-center">
            <div className="col-12 d-flex">
              <div style={{ flex: 1 }}>
                <h1 className="text-uppercase text-greyDark mb-0"><strong>{this.props.name}</strong></h1>
              </div>
              <div>
                {this.props.molecules.length > 0 ? <img src={this.props.molecules[0].url} role="presentation" style={{ maxWidth: 96 }} /> : null}
              </div>
            </div>
            <div className="col-12">
              <div className="mt-1 mb-3">
                {this.props.classes.length > 0 ? (
                  <p><strong className="text-uppercase text-pinkLight">{this.props.classes[0].title}</strong></p>
                ) : (
                  <div className="text-grey">+ Adicionar classificação</div>
                )}
              </div>
              {this.props.aliases && this.props.aliases.length > 0 ? <span>
                <h6 className="text-uppercase mb-0">Nomes comuns</h6>
                <p><small>{this.props.aliases.join(', ')}</small></p>
              </span> : null}

              {this.props.routes.length > 0 ? (
                <div>
                  <h6 className="text-uppercase">Rotas de administração</h6>
                  <div className="accordion">
                    {this.props.routes.map((route) => {
                      const id = route.id
                      return (
                        <div className="card" key={route.id}>
                          <div className="card-header" style={{ padding: '0.5rem 0.75rem' }}>
                            <button className="d-inline-flex justify-content-between w-100" type="button" onClick={() => this.setState({ routes: { [id]: !this.state.routes[id] } })}>
                              {route.name}
                              <i className="material-icons">{this.state.routes[id] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</i>
                            </button>
                          </div>
                          <Collapse isOpen={this.state.routes[id]}>
                            <div className="card-body">
                              uehauhea
                            </div>
                          </Collapse>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-grey">+ Adicionar vias de administração</div>
              )}
              {this.props.alerts ?
                <Alert type="danger" icon="warning">
                  <ul className="m-0 pl-4">
                    {this.props.alerts.map((alert, index) => (
                      <li key={index}><strong>{alert}</strong></li>
                    ))}
                  </ul>
                </Alert>
                : null }
            </div>
          </div>
        </section>
      </div>
    )
  }
  }

DrugHeader.propTypes = {
  name: PropTypes.string,
  classes: PropTypes.array,
  aliases: PropTypes.array,
  routes: PropTypes.array,
  molecules: PropTypes.array,
  alerts: PropTypes.array,
}

DrugHeader.defaultProps = {
  classes: [],
  aliases: [],
  routes: [],
  molecules: [],
  alerts: [],
}

export default DrugHeader

/**
*
* DrugHeader
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../Alert'

function DrugHeader(props) {
  return (
    <div>
      <section className="pt-3 pb-0">
        <div className="row align-items-center">
          <div className="col-12 d-flex">
            <div style={{ flex: 1 }}>
              <h1 className="text-uppercase text-greyDark mb-0"><strong>{props.name}</strong></h1>
            </div>
            <div>
              {props.molecules.length > 0 ? <img src={props.molecules[0].url} role="presentation" style={{ maxWidth: 96 }} /> : null}
            </div>
          </div>
          <div className="col-12">
            <div className="mt-1 mb-3">
              {props.classes.length > 0 ? (
                <p><strong className="text-uppercase text-pinkLight">{props.classes[0].title}</strong></p>
              ) : (
                <div className="text-grey">+ Adicionar classificação</div>
              )}
            </div>
            {props.aliases ? <span>
              <h6 className="text-uppercase mb-0"><strong>Nomes comuns</strong></h6>
              <p><em><small>{props.aliases.join(', ')}</small></em></p>
            </span> : null}

            {props.routes.length > 0 ? (
              <div>
                <h6 className="text-uppercase mb-0"><strong>Vias de administração</strong></h6>
                <p><small>{props.routes.map((route, index) => `${route.name}${index !== props.routes.length - 1 ? ', ' : ''}`)}</small></p>
              </div>
            ) : (
              <div className="text-grey">+ Adicionar vias de administração</div>
            )}
            {props.alerts ?
              <div>
                {props.alerts.map((alert, index) => (
                  <div key={index}><Alert icon="warning" type="warning">{alert}</Alert></div>
                ))}
              </div>
              : null }
          </div>
        </div>
      </section>
    </div>
  )
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

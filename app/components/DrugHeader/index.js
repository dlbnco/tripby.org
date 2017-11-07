/**
*
* DrugHeader
*
*/

import React from 'react'
import PropTypes from 'prop-types'

function DrugHeader(props) {
  return (
    <div>
      <section className="section pb-0" style={{ backgroundColor: '#E0F7FA', color: '#424242' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6">
              <h1 className="text-uppercase mb-0"><strong>{props.drugName}</strong></h1>
            </div>
            <div className="col-6 d-flex justify-content-end">
              {props.drugMolecules.length > 0 ? <img src={props.drugMolecules[0].url} role="presentation" style={{ maxWidth: 96 }} /> : null}
            </div>
            <div className="col-12">
              {props.drugAliases ? <span>
                  ou
                  <p><em><small>{props.drugAliases.join(', ')}</small></em></p>
              </span> : null}
              <div className="badge badge-pill mb-3">
                <span className="text-uppercase"><strong>{props.drugClass}</strong></span>
              </div>
              <p className="text-uppercase mb-0"><strong>Vias de administração</strong></p>
              <p>{props.drugRoutes}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

DrugHeader.propTypes = {
  drugName: PropTypes.string,
  drugClass: PropTypes.string,
  drugAliases: PropTypes.array,
  drugRoutes: PropTypes.array,
  drugMolecules: PropTypes.array,
}

export default DrugHeader

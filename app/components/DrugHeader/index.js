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
      <section className="pt-3 pb-0">
        <div className="row align-items-center">
          <div className="col-12 d-flex">
            <div style={{ flex: 1 }}>
              <h1 className="text-uppercase text-greyDark mb-0"><strong>{props.drugName}</strong></h1>
            </div>
            <div>
              {props.drugMolecules.length > 0 ? <img src={props.drugMolecules[0].url} role="presentation" style={{ maxWidth: 96 }} /> : null}
            </div>
          </div>
          <div className="col-12">
            {props.drugAliases ? <span>
                  ou
                  <p><em><small>{props.drugAliases.join(', ')}</small></em></p>
            </span> : null}
            <div className="my-3">
              {props.drugClass.length > 0 ? (
                <div className="badge badge-pill text-uppercase">{props.drugClass[0].title}</div>
                ) : (
                  <div className="text-grey">+ Adicionar classificação</div>
                )}
            </div>

            {props.drugRoutes.length > 0 ? (
              <div>
                <p className="text-uppercase mb-0"><strong>Vias de administração</strong></p>
                <p><small>{props.drugRoutes.map((route, index) => `${route.name}${index !== props.drugRoutes.length - 1 ? ', ' : ''}`)}</small></p>
              </div>
            ) : (
              <div className="text-grey">+ Adicionar vias de administração</div>
            )}
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

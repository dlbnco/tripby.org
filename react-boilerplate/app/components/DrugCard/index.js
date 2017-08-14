/**
*
* DrugCard
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'


function DrugCard(props) {
  const moleculeStyle = {
    backgroundImage: `url(${props.drugMolecule})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }
  return (
    <Link to={`/psicoativos/${props.slug}`} className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-block">
        <div className="row">
          <div className="col-8">
            <h3 className="tbBlue-text">{props.drugName}</h3>
            <p className="mb-0">
              <strong className="text-uppercase" style={{ color: '#f06292' }}>{props.drugClass}</strong><br />
              <i className="card__icon material-icons" aria-hidden="true">invert_colors</i>{props.drugDosage}<br />
              <i className="card__icon material-icons" aria-hidden="true">timer</i>{props.drugDuration}
            </p>
          </div>
          <div className="col-4" style={moleculeStyle}>
          </div>
        </div>
      </div>
    </Link>
  )
}

DrugCard.propTypes = {
  drugMolecule: PropTypes.string,
  slug: PropTypes.string,
  drugName: PropTypes.string,
  drugClass: PropTypes.string,
  drugDosage: PropTypes.string,
  drugDuration: PropTypes.string,
}

export default DrugCard

/**
*
* DrugCard
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import SVG from 'react-inlinesvg'

const moleculeIcon = require('../../assets/img/icons/molecule.svg')

function DrugCard(props) {
  const moleculeStyle = {
    backgroundImage: `url(${props.molecule})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }
  return (
    <Link to={`/drugs/${props.id}`} className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <h3 className="text-blue">{props.name}</h3>
            <p className="mb-0">
              <span className="text-uppercase" style={{ color: '#f06292' }}>{props.class}</span><br />
              {props.duration ? (
                <div>
                  <i className="card__icon material-icons" aria-hidden="true">timer</i>{props.duration}
                </div>
            ) : null }
            </p>
          </div>
          <div className="col-4">
            {props.molecule ? (
              <div style={moleculeStyle}></div>
            ) :
              <div>
                <div className="icon-molecule"><SVG src={moleculeIcon} /></div>
              </div>}
          </div>
        </div>
      </div>
    </Link>
  )
}

DrugCard.propTypes = {
  molecule: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  class: PropTypes.string,
  duration: PropTypes.string,
}

export default DrugCard

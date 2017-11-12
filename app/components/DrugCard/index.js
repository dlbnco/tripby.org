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
            <h3 className="tbBlue-text">{props.name}</h3>
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
                <svg className="svg-icon" style={{ fill: '#eee' }} viewBox="0 0 20 20">
                  <path d="M14.68,12.621c-0.9,0-1.702,0.43-2.216,1.09l-4.549-2.637c0.284-0.691,0.284-1.457,0-2.146l4.549-2.638c0.514,0.661,1.315,1.09,2.216,1.09c1.549,0,2.809-1.26,2.809-2.808c0-1.548-1.26-2.809-2.809-2.809c-1.548,0-2.808,1.26-2.808,2.809c0,0.38,0.076,0.741,0.214,1.073l-4.55,2.638c-0.515-0.661-1.316-1.09-2.217-1.09c-1.548,0-2.808,1.26-2.808,2.809s1.26,2.808,2.808,2.808c0.9,0,1.702-0.43,2.217-1.09l4.55,2.637c-0.138,0.332-0.214,0.693-0.214,1.074c0,1.549,1.26,2.809,2.808,2.809c1.549,0,2.809-1.26,2.809-2.809S16.229,12.621,14.68,12.621M14.68,2.512c1.136,0,2.06,0.923,2.06,2.06S15.815,6.63,14.68,6.63s-2.059-0.923-2.059-2.059S13.544,2.512,14.68,2.512M5.319,12.061c-1.136,0-2.06-0.924-2.06-2.06s0.923-2.059,2.06-2.059c1.135,0,2.06,0.923,2.06,2.059S6.454,12.061,5.319,12.061M14.68,17.488c-1.136,0-2.059-0.922-2.059-2.059s0.923-2.061,2.059-2.061s2.06,0.924,2.06,2.061S15.815,17.488,14.68,17.488"></path>
                </svg>
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

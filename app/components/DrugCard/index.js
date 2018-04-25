/**
*
* DrugCard
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import Markdown from 'react-markdown'

import FeatherIcon from '../FeatherIcon'

function DrugCard(props) {
  const moleculeStyle = {
    backgroundImage: `url(${props.molecules && props.molecules.length > 0 ? props.molecules[0].url : ''})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
  }
  return (
    <Link to={`/drugs/${props.id}/overview`} className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <h3 className="text-blue text-hover">{props.name}</h3>
            <p className="mb-0">
              {props.classes.length > 0 ? (<span className="text-uppercase" style={{ color: '#f06292' }}>{props.classes[0].title}</span>) : null}
              {props.duration ? (
                <div>
                  <i className="card__icon material-icons" aria-hidden="true">timer</i>{props.duration}
                </div>
            ) : null }
            </p>
            {props.aliases && props.aliases.length > 0 ? <span>
              <small className="text-muted">({props.aliases.join(', ')})</small>
            </span> : null}
          </div>
          <div className="col-4 d-flex align-items-center">
            {props.molecules.length > 0 ? (
              <div style={moleculeStyle}></div>
            ) :
              <div className="icon-molecule mx-auto">
                <FeatherIcon icon="loader" size={48} />
              </div>
              }
          </div>
          {props.summary ? (
            <div className="col-12">
              <Markdown>
                {props.summary}
              </Markdown>
            </div>
              ) : null}
        </div>
      </div>
    </Link>
  )
}

DrugCard.defaultProps = {
  molecules: [],
  classes: [],
  aliases: [],
}

DrugCard.propTypes = {
  molecules: PropTypes.array,
  aliases: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  classes: PropTypes.array,
  duration: PropTypes.string,
  summary: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default DrugCard

import React, { PropTypes } from 'react'

class DrugCard extends React.Component{
  render () {
    const moleculeStyle = {
      backgroundImage: 'url(' + this.props.drugMolecule + ')',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
    return (
      <div className="card" style={{marginBottom: '1rem'}}>
        <div className="card-block">
          <div className="row">
            <div className="col-8">
              <h3 className="tbBlue-text">{this.props.drugName}</h3>
              <p className="mb-0">
                <strong className="text-uppercase" style={{color: '#f06292'}}>{this.props.drugClass}</strong><br />
                <i className="card__icon material-icons" aria-hidden="true">invert_colors</i>{this.props.drugDosage}<br />
                <i className="card__icon material-icons" aria-hidden="true">timer</i>{this.props.drugDuration}
              </p>
            </div>
            <div className="col-4" style={moleculeStyle}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DrugCard

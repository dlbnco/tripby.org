import React, { PropTypes } from 'react'

class DrugCard extends React.Component{
  render () {
    return (
      <div className="card">
        <div className="card-block">
          <div className="row">
            <div className="col-8">
              <h4 className="tbBlue-text">MACONHA</h4>
              <p style={{color: '#f06292'}}><strong>CANABINÓIDE</strong></p>
            </div>
            <div className="col-4">
              <img src="http://tripby.org/wp-content/uploads/2016/01/2cb-1.svg" style={{width: '100%'}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DrugCard

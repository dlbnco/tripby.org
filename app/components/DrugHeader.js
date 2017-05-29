import React, { PropTypes } from 'react'

class DrugHeader extends React.Component{
  render () {
    return (
      <div>
        <section className="section--tight">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="text-uppercase"><strong>{this.props.drugName}</strong></h1>
                <h5>ou</h5>
                <p><em>{this.props.drugNicknames}</em></p>
                <div className="badge badge-pill mb-3">
                  <span className="text-uppercase"><strong>{this.props.drugClass}</strong></span>
                </div>
                <p className="text-uppercase mb-0"><strong>Vias</strong></p>
                <p>{this.props.drugRoutes}</p>
              </div>
              <div className="col col-md-4">
                <img src={this.props.drugMolecule} />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default DrugHeader

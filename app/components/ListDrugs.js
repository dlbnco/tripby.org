import React, { PropTypes } from 'react'
import DrugCard from './DrugCard'
import axios from 'axios'

class ListDrugs extends React.Component{

  constructor() {
    super()
    this.state = {
      drugObject: []
    }
  }

  render () {
    console.log(this.state.drugObject)
    const drugs = this.state.drugObject.map( ( drug, index ) =>
      <div className="col-12 col-md-6" key={index}>
        <DrugCard drugName={drug.title.rendered} />
      </div>
   )
  return (
    <div>
      <h4 className="text-uppercase">Psicoativos</h4>
      <div className="row">
      {drugs}
    </div>
  </div>
  )
}

componentDidMount() {
  var self = this;
  axios.get('http://tripby.org/wp-json/wp/v2/pages', {
    params: {
      per_page: this.props.perPage,
      parent: 1484,
    }
  })
  .then(function (response) {
    console.log(response)
    self.setState({drugObject: response.data})
  })
  .catch(function (error) {
    console.log(error)
  });
}


}

export default ListDrugs

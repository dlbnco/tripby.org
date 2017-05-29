import React, { PropTypes } from 'react'
import DrugHeader from './DrugHeader'
import axios from 'axios'
import Spinner from './Spinner'

class Drug extends React.Component{
  constructor() {
    super()
    this.state = {
      drugObject: {
        title: {
          rendered: ''
        }
      },
      loading: true,
      error: null
    }
  }
  theDrug() {
    if (this.state.loading && this.state.error == null) {
      return (
        <Spinner className="mx-auto" />
      )
    } else if (this.state.error !== null) {
      return (
        <div className="col text-center">
          😥<br />
        {this.state.error}
      </div>
    )
  } else {
    return (
      <DrugHeader drugName={this.state.drugObject.title.rendered} drugNicknames={this.state.drugObject.acf.drug_popular_names} drugClass={this.state.drugObject.acf.drug_type} drugRoutes={this.state.drugObject.acf.drug_roa} drugMolecule={this.state.drugObject.acf.drug_molecule_grey}/>
    )
  }
}
render () {
  return (
    <div>
      {this.theDrug()}
    </div>
  )
}
componentDidMount(){
  var that = this;
  axios.get('http://tripby.org/wp-json/wp/v2/pages', {
    params: {
      slug: this.props.params.drug
    }
  })
  .then(function (response) {
    console.log(response.data)
    that.setState({drugObject: response.data[0], loading: false})
  })
  .catch(function (error) {
    that.setState({error: 'Desculpe, não foi possível fazer o corre das informações'})
  });
}
}

export default Drug

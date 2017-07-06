import React from 'react'
import DrugCard from './DrugCard'
import axios from 'axios'
import Spinner from './Spinner'
import LinkButton from './LinkButton'

class ListDrugs extends React.Component{

  constructor() {
    super()
    this.state = {
      drugObject: [],
      loading: true,
      error: null
    }
  }

  theDrugs() {
    const drugs = this.state.drugObject.map( ( drug, index ) => (
      <div className="col-12 col-md-6 col-lg-4" key={index}>
        <DrugCard slug={drug.slug} drugName={drug.title.rendered} drugClass={drug.acf.drug_type} drugMolecule={drug.acf.drug_molecule_grey} drugDosage={drug.acf.drug_dose} drugDuration={drug.acf.drug_duration}/>
      </div>
    ))
    if (this.state.loading && this.state.error == null) {
      return (
        <Spinner className="mx-auto" />
      )
    } else if (this.state.error !== null) {
      return (
        <div className="col text-center">
          😥<br />{this.state.error}
        </div>
      )
    } else return drugs
  }

  render () {
    return (
      <div>
        <div className="row">
          {this.theDrugs()}
        </div>
        {this.state.loading ? null : <LinkButton text="Mais" link="/psicoativos" icon="trending_flat" />}
        {this.state.loading ? null : <LinkButton text="Adicionar novo" link="/psicoativos" icon="add" secondary/>}
      </div>
    )
  }

  componentDidMount() {
    const that = this
    // first call
    // get drug info from WordPress API
    axios.get('http://tripby.org/wp-json/wp/v2/pages', {
      params: {
        order: 'desc',
        orderby: 'date',
        per_page: this.props.perPage,
        parent: 1484
      }
    })
    .then(function (response) {
      // set state with info from response
      that.setState({drugObject: response.data, loading: false})
    })
    .catch(function (error) {
      that.setState({error: 'Desculpe, não foi possível fazer o corre das informações'})
    });
  }


}

export default ListDrugs

/*
*
* ListDrugs
*
*/

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import DrugCard from '../../components/DrugCard'
import Spinner from '../../components/Spinner'
import LinkButton from '../../components/LinkButton'

export class ListDrugs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      drugObject: [],
      loading: true,
      error: null,
    }
  }
  theDrugs() {
    const allDrugs = this.props.data.allDrugs
    const drugs = allDrugs.map((drug, index) => (
      <div className="col-12 col-md-6 col-lg-4" key={index}>
        <DrugCard id={drug.id} name={drug.name} class={drug.class.length > 0 ? drug.class[0].title : null} molecule={drug.molecules.length > 0 ? drug.molecules[0].url : null} />
      </div>)
    )
    return drugs
  }
  render() {
    const loading = this.props.data.loading
    return (
      <div>
        <div className="mb-3">Mostrando {this.props.limit} psicoativos</div>
        <div className="row">
          {loading ? <Spinner /> : this.theDrugs()}
        </div>
        {loading ? null : <LinkButton text="Mais" link="/drugs" icon="trending_flat" />}
        {loading ? null : <LinkButton text="Adicionar novo" link="/psicoativos" icon="add" secondary />}
      </div>
    )
  }
}

const Drugs = gql`
  query($limit: Int) {
    allDrugs(last: $limit) {
      id
      name
      aliases
      class {
        title
      }
      molecules {
        url
      }
    }
  }
`

ListDrugs.propTypes = {
  limit: PropTypes.number,
  data: PropTypes.object,
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default graphql(Drugs, { options: ({ limit }) => ({ variables: { limit } }) })(connect(null, mapDispatchToProps)(ListDrugs))

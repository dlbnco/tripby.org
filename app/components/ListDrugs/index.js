/*
*
* ListDrugs
*
*/

import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setNavigation } from '../../containers/AllDrugs/actions'
import makeSelectAllDrugs from '../../containers/AllDrugs/selectors'
import DrugCard from '../../components/DrugCard'
import Spinner from '../../components/Spinner'
import messages from './messages'

export class ListDrugs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      loading: true,
      error: null,
    }
  }
  theDrugs() {
    const allDrugs = this.props.data.allDrugs
    const drugs = allDrugs.map((drug, index) => (
      <div className="col-12 col-md-6 col-lg-4" key={index}>
        <DrugCard id={drug.id} name={drug.name} class={drug.classes.length > 0 ? drug.classes[0].title : null} molecule={drug.molecules.length > 0 ? drug.molecules[0].url : null} />
      </div>)
    )
    return (
      <div className="row">{drugs}</div>
    )
  }
  render() {
    const loading = this.props.data.loading
    const pages = []
    if (!loading) {
      for (let i = 0; i < Math.ceil(this.props.data._allDrugsMeta.count / this.props.limit); i += 1) {
        pages.push(i + 1)
      }
    }
    return (
      <div>
        {loading ?
          <Spinner />
            : (
              <div>
                <div className="mb-3">
                  <FormattedMessage
                    {...messages.countInfo}
                    values={{
                      limit: this.props.limit,
                      count: this.props.data._allDrugsMeta.count,
                    }}
                  />
                </div>
                {this.theDrugs()}
                {this.props.pagination ? (
                  <nav aria-label="Page navigation">
                    <ul className="pagination list-unstyled">
                      <li className="page-item"><button disabled={this.props.pagination.currentPage === 0} onClick={() => this.props.dispatch(setNavigation({ navigation: { page: this.props.pagination.currentPage - 1 } }))} className="page-link" href="#">Anterior</button></li>
                      { pages.map((page) => (
                        <li className={`page-item ${this.props.pagination.currentPage === (page - 1) ? 'active' : ''}`}><button onClick={() => this.props.dispatch(setNavigation({ navigation: { page: page - 1 } }))} className="page-link" href="#">{page}</button></li>
                      ))
                    }
                      <li className="page-item"><button onClick={() => this.props.dispatch(setNavigation({ navigation: { page: this.props.pagination.currentPage + 1 } }))} className="page-link" href="#">Próximo</button></li>
                    </ul>
                  </nav>
              ) : null}
              </div>
            )}
      </div>
    )
  }
}

ListDrugs.propTypes = {
  limit: PropTypes.number,
  data: PropTypes.object,
  pagination: PropTypes.object,
  dispatch: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  AllDrugs: makeSelectAllDrugs(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const Drugs = gql`
  query($limit: Int, $orderBy: DrugOrderBy, $skip: Int, $filter: DrugFilter) {
    _allDrugsMeta(filter: $filter) {
      count
    }
    allDrugs(first: $limit, orderBy: $orderBy, skip: $skip, filter: $filter) {
      id
      name
      aliases
      classes {
        title
      }
      molecules {
        url
      }
    }
  }
`


export default graphql(Drugs, { options: ({ limit, orderBy, skip, filter }) => ({ variables: { limit, orderBy, skip, filter } }) })(connect(mapStateToProps, mapDispatchToProps)(ListDrugs))

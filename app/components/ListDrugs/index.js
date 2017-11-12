/*
*
* ListDrugs
*
*/

import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'
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
        <DrugCard id={drug.id} name={drug.name} class={drug.class.length > 0 ? drug.class[0].title : null} molecule={drug.molecules.length > 0 ? drug.molecules[0].url : null} />
      </div>)
    )
    return (
      <div className="row">{drugs}</div>
    )
  }
  render() {
    const loading = this.props.data.loading
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
              </div>
            )}
      </div>
    )
  }
}

ListDrugs.propTypes = {
  limit: PropTypes.number,
  data: PropTypes.object,
}

const Drugs = gql`
  query($limit: Int, $orderBy: DrugOrderBy, $skip: Int) {
    allDrugs(first: $limit, orderBy: $orderBy, skip: $skip) {
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
    _allDrugsMeta {
      count
    }
  }
`


export default graphql(Drugs, { options: ({ limit, orderBy, skip }) => ({ variables: { limit, orderBy, skip } }) })(ListDrugs)

/*
 *
 * AllDrugs
 *
 */

import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import qs from 'qs'
import { createStructuredSelector } from 'reselect'
import makeSelectAllDrugs from './selectors'
import ListDrugs from '../../components/ListDrugs'
import FilterDrugs from '../../components/FilterDrugs'
import messages from './messages'
import PageHeader from '../../components/PageHeader'

export class AllDrugs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      navigation: {
        orderBy: 'name_ASC',
        limit: 20,
        page: 0,
      },
    }
    this.handlePagination = this.handlePagination.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.AllDrugs !== this.props.AllDrugs) {
      this.updateQuery()
    }
  }
  updateQuery() {
    let query = this.props.AllDrugs.navigation
    query = qs.stringify(query)
    browserHistory.push({
      pathname: '/drugs',
      search: `?${query}`,
    })
  }
  handlePagination(page) {
    const navigation = this.state.navigation
    navigation.page = page
    this.setState({
      navigation,
    })
  }
  render() {
    const nav = this.props.location.search !== '' ? qs.parse(this.props.location.search) : this.props.AllDrugs.navigation
    const currentPage = Number(nav.page)
    const limit = Number(nav.limit)
    const skip = limit * (currentPage)
    const pages = []
    if (!this.props.data.loading) {
      for (let i = 0; i < Math.ceil(this.props.data._allDrugsMeta.count / limit); i += 1) {
        pages.push(i + 1)
      }
    }
    return (
      <div>
        <Helmet
          title="AllDrugs"
          meta={[
            { name: 'description', content: 'Description of AllDrugs' },
          ]}
        />
        <PageHeader>
          <FormattedMessage {...messages.header} />
        </PageHeader>
        <section className="py-4">
          <div className="container">
            <FilterDrugs categories={this.props.data.allCategories || []} />
            <ListDrugs limit={limit} orderBy={nav.orderBy} skip={skip} filter={nav.filter} pagination={{ pages, currentPage }} />

          </div>
        </section>
      </div>
    )
  }
}

AllDrugs.propTypes = {
  data: PropTypes.object,
  AllDrugs: PropTypes.object,
  location: PropTypes.object,
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
  query {
    _allDrugsMeta {
      count
    }
    allCategories {
      id
      title
    }
  }
`

export default graphql(Drugs)(connect(mapStateToProps, mapDispatchToProps)(AllDrugs))

/**
*
* FilterDrugs
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setNavigation } from '../../containers/AllDrugs/actions'
import makeSelectAllDrugs from '../../containers/AllDrugs/selectors'
// import styled from 'styled-components';

import messages from './messages'

function FilterDrugs(props) {
  return (
    <div className="d-flex">
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <FormattedMessage {...messages.class} />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#!" onClick={() => props.dispatch({ type: 'RESET_FILTERS' })}>
            {messages.class.allClasses}
          </a>
          {props.categories.map((category, index) =>
            <a key={index} className="dropdown-item" href="#!" onClick={() => props.dispatch(setNavigation({ navigation: { filter: { classes_some: { id: category.id } }, page: 0 } }))}>{category.title}</a>
              )}
        </div>
      </div>
    </div>
  )
}

FilterDrugs.propTypes = {
  categories: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  AllDrugs: makeSelectAllDrugs(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDrugs)

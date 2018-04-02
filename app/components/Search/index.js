/**
*
* Search
*
*/

import React from 'react'
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl'
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch/dom'
import messages from './messages'
import DrugCard from '../DrugCard'

function Search() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <InstantSearch
        appId="Y9AKTKXRI6"
        apiKey="6fc18ed8e8e829048f8318b04fb66252"
        indexName="Drug"
      >
        <SearchBox />
        <Hits hitComponent={DrugCard} />
      </InstantSearch>
    </div>
  )
}

Search.propTypes = {

}

export default Search

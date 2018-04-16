/**
*
* Search
*
*/

import React from 'react'
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl'
import { InstantSearch, Hits, PoweredBy } from 'react-instantsearch/dom'
import { connectSearchBox, connectHighlight } from 'react-instantsearch/connectors'
import messages from './messages'
import DrugCard from '../DrugCard'

export class MySearchBox extends React.Component {
  componentDidMount() {
    this.searchInput.focus()
  }
  render() {
    return ( // eslint-disable-line
      <form>
        <div className="form-group my-3">
          <input
            ref={(input) => { this.searchInput = input }}
            type="text"
            className="form-control form-control-lg"
            value={this.props.currentRefinement} //eslint-disable-line
            onChange={(e) => this.props.refine(e.target.value)} //eslint-disable-line
          />
        </div>
      </form>
    )
  }
}

const ConnectedSearchBox = connectSearchBox(MySearchBox)

const CustomHighlight = connectHighlight(
  ({ highlight, attribute, hit }) => {
    const parsedHit = highlight({
      attribute,
      hit,
      highlightProperty: '_highlightResult',
    })
    const highlightedHits = parsedHit.map((part) => {
      if (part.isHighlighted) return <mark>{part.value}</mark>
      return part.value
    })
    return <div>{highlightedHits}</div>
  }
)

const Hit = ({ hit }) => ( //eslint-disable-line
  <DrugCard
    name={<CustomHighlight attribute="name" hit={hit} />}
    classes={hit.classes}
    aliases={hit.aliases}
    molecules={hit.molecules}
    id={hit.objectID}
    summary={hit.summary}
  />
)


class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      query: false,
    }
  }
  render() {
    return (
      <section className="py-4 py-md-5">
        <div className="container">
          <h1 className="text-uppercase"><strong><FormattedMessage {...messages.header} /></strong></h1>
          <InstantSearch
            appId="Y9AKTKXRI6"
            apiKey="6fc18ed8e8e829048f8318b04fb66252"
            indexName="Drug"
            onSearchStateChange={(e) => {
              this.setState({ query: e.query !== '' }) // update state to hide Hits when search query is empty
            }}
          >
            <ConnectedSearchBox />
            <small className="text-muted"><PoweredBy /></small>
            {this.state.query ? <span className="mt-3 d-block"><Hits hitComponent={Hit} /></span> : null}
          </InstantSearch>
        </div>
      </section>
    )
  }
}

Search.propTypes = {

}

export default Search

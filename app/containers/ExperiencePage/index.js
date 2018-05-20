/*
 *
 * ExperiencePage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Markdown from 'react-markdown'
import { Link } from 'react-router'

import makeSelectExperiencePage from './selectors'
import messages from './messages'
import Spinner from '../../components/Spinner'
import Badge from '../../components/Badge'

export class ExperiencePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { Experience } = this.props.data
    const { loading } = this.props.data
    return (
      <div>
        <Helmet
          title={`${!loading ? Experience.title : '...'} · ${messages.header.defaultMessage}`}
          meta={[
            { name: 'description', content: 'Description of ExperiencePage' },
          ]}
        />
        <section className="py-4">
          <div className="container">
            {!loading ? (
              <div>
                <p className="text-muted text-uppercase">
                  <FormattedMessage {...messages.header} />
                </p>
                <h1><strong>{Experience.title}</strong></h1>
                <ul className="list-unstyled p-0 d-inline-flex">
                  {Experience.drugs.map((drug, index) =>
                    <li className={index < Experience.drugs.length - 1 && 'mr-2'} key={drug.id}>
                      <Link to={`/drugs/${drug.id}/overview`}><Badge bg="blue">{drug.name}</Badge></Link>
                    </li>
                )}
                </ul>
                <Markdown source={Experience.story} />
              </div>
          ) : (
            <Spinner />
            )}
          </div>
        </section>
      </div>
    )
  }
}

ExperiencePage.propTypes = {
  data: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  ExperiencePage: makeSelectExperiencePage(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const Experience = gql`
  query($id: ID!) {
    Experience(id: $id) {
      title
      story
      drugs {
        id
        name
      }
      author {
        id
      }
    }
  }
`

export default graphql(Experience, { options: ({ params }) => ({ variables: { id: params.id } }) })(connect(mapStateToProps, mapDispatchToProps)(ExperiencePage))

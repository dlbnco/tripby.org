/*
 *
 * EditDrugPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { graphql, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Collapse } from 'reactstrap'
import classnames from 'classnames'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import PageHeader from '../../components/PageHeader'
import Spinner from '../../components/Spinner'
import Badge from '../../components/Badge'
import FeatherIcon from '../../components/FeatherIcon'

import makeSelectEditDrugPage from './selectors'
import messages from './messages'

const ContributionSection = ({ isOpen, title, children, toggle }) => (
  <div className="card">
    <button className="card-header text-left" onClick={toggle}>
      <h4 className="text-muted">{title}</h4>
    </button>
    <Collapse isOpen={isOpen}>
      <div className="card-body">
        {children}
      </div>
    </Collapse>
  </div>
)

ContributionSection.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  toggle: PropTypes.func,
}


export class EditDrugPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    sections: {
      basics: true,
    },
  }
  toggleSection(id) {
    const { sections } = this.state
    sections[id] = !sections[id]
    this.setState({ sections })
  }
  render() {
    const { loading, Drug } = this.props.data
    const { sections } = this.state
    const classButton = classnames({
      'list-group-item': true,
      'list-group-item-action': true,
      'd-flex': true,
      'align-items-center': true,
      'justify-content-between': true,
      // active: this.state.selectedDrugs.indexOf(drug) >= 0,
    })
    return (
      <div>
        <Helmet
          title={messages.meta.title}
          meta={[
            { name: 'description', content: messages.meta.description },
          ]}
        />
        {!loading ? (
          <div>
            <PageHeader>
              <FormattedMessage values={{ drug: Drug.name }} {...messages.header} />
            </PageHeader>
            <section className="py-3 py-md-4">
              <div className="container">
                <ContributionSection
                  title={messages.sections.basics.title}
                  isOpen={sections.basics}
                  toggle={() => this.toggleSection('basics')}
                >
                  <form>
                    <div className="form-group">
                      <label htmlFor="name"><strong>{messages.sections.basics.form.name.label}</strong></label>
                      <input type="text" name="name" className="form-control" />
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="class">
                            <strong>{messages.sections.basics.form.classes.label}</strong>
                          </label>
                          <Query query={GET_CATEGORIES}>
                            {({ loading, error, data }) => { //eslint-disable-line
                              if (loading) return <Spinner />
                              return (
                                <ul className="list-group d-block" style={{ maxHeight: 240, overflowY: 'auto' }}>
                                  {data.allCategories.map((category) =>
                                    <button type="button" key={category.id} className={classButton}>
                                      {category.title}
                                      <FeatherIcon icon={'circle'} size={24} />
                                    </button>
                              )}
                                </ul>
                              )
                            }}
                          </Query>
                        </div>
                      </div>
                      <div className="col-12 d-md-none"><hr /></div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="name"><strong>{messages.sections.basics.form.aliases.label}</strong></label>
                          <input type="text" name="alias" className="form-control" placeholder={messages.sections.basics.form.aliases.placeholder} />
                          <div className="badge-group mt-3">
                            {Drug.aliases.map((alias, index) =>
                              <Badge bg="pinkLighter" key={`${alias}-${index}`}>
                                {alias}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="form-group">
                      <label htmlFor="overview"><strong>{messages.sections.basics.form.overview.label}</strong></label>
                      <ReactQuill />
                    </div>
                  </form>
                </ContributionSection>
                <ContributionSection>

                </ContributionSection>
              </div>
            </section>
          </div>
          ) : (
            <Spinner />
          )}

      </div>
    )
  }
}

EditDrugPage.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.object,
}

const GET_CATEGORIES = gql`
  query {
    allCategories {
      title
      id
    }
  }
`

const Drug = gql`
  query($id: ID!) {
    Drug(id: $id) {
      name
      alerts
      aliases
      health
      law
      experiences {
        id
        title
        drugs {
          id
          name
        }
      }
      effects {
        name
      }
      classes {
        id
        title
      }
      routes {
        id
        type
        durations {
          min
          max
          timeframe
        }
        dosage {
          treshold
          light
          common
          strong
          heavy
        }
      }
      molecules {
        url
      }
      summary
    }
  }
`


const mapStateToProps = createStructuredSelector({
  EditDrugPage: makeSelectEditDrugPage(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default graphql(Drug, { options: ({ params }) => ({ variables: { id: params.drug } }) })(connect(mapStateToProps, mapDispatchToProps)(EditDrugPage))

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
import { Converter } from 'showdown'
import { Map } from 'immutable'

import PageHeader from '../../components/PageHeader'
import Spinner from '../../components/Spinner'
import Badge from '../../components/Badge'
import FeatherIcon from '../../components/FeatherIcon'
import Alert from '../../components/Alert'

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
    newDrug: Map(),
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.data.Drug && this.props.data.Drug) {
      this.buildDrugState()
    }
  }
  buildDrugState() {
    const { Drug } = this.props.data
    const drugObj = (JSON.parse(JSON.stringify(Drug)))
    const converter = new Converter()
    Object.defineProperties(drugObj, {
      summary: {
        value: converter.makeHtml(Drug.summary),
        writable: true,
      },
      health: {
        value: converter.makeHtml(Drug.health),
        writable: true,
      },
      law: {
        value: converter.makeHtml(Drug.law),
        writable: true,
      },
    })
    const newDrug = Map(drugObj)
    this.setState({
      newDrug,
    })
  }
  handleChange(property, value) {
    this.setState(({ newDrug }) => ({
      newDrug: newDrug.set(property, value),
    }))
  }
  handleAliases(e) {
    let { value } = e.target
    if (e.key === 'Enter') {
      const aliases = this.state.newDrug.get('aliases')
      aliases.splice(0, 0, value)
      this.handleChange('aliases', aliases)
      value = ''
    }
  }
  toggleSection(id) {
    const { sections } = this.state
    sections[id] = !sections[id]
    this.setState({ sections })
  }
  render() {
    const { loading, Drug } = this.props.data
    const { sections, newDrug } = this.state
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
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="name"><strong>{messages.sections.basics.form.name.label}</strong></label>
                          <input value={newDrug.get('name')} onChange={(e) => this.handleChange('name', e.target.value)} type="text" name="name" className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name"><strong>{messages.sections.basics.form.aliases.label}</strong></label>
                          <input
                            type="text"
                            name="alias"
                            className="form-control form-control-lg"
                            placeholder={messages.sections.basics.form.aliases.placeholder}
                            onKeyPress={(e) => this.handleAliases(e)}
                          />
                          <div className="badge-group mt-3">
                            {newDrug.get('aliases').map((alias, index) =>
                              <Badge
                                key={`${alias}-${index}`}
                                bg="pinkLighter"
                                close={() => this.handleChange('aliases', newDrug.get('aliases').filter((string) => string !== alias))}
                              >
                                {alias}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 d-md-none"><hr /></div>
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
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="class">
                            <strong>{messages.sections.basics.form.routes.label}</strong>
                          </label>
                          <Query query={GET_ROUTES}>
                            {({ loading, error, data }) => { //eslint-disable-line
                              if (loading) return <Spinner />
                              return (
                                <ul className="list-group d-block" style={{ overflowY: 'auto' }}>
                                  {data.__type.enumValues.map((route) =>
                                    <button type="button" key={route.name} className={classButton}>
                                      {route.name}
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
                          <label htmlFor="name"><strong>{messages.sections.basics.form.alerts.label}</strong></label>
                          <input type="text" name="alias" className="form-control form-control-lg" placeholder={messages.sections.basics.form.aliases.placeholder} />
                        </div>
                        <Alert type="danger" icon="warning">
                          <ul className="m-0 pl-4">
                            {Drug.alerts && Drug.alerts.map((alert, index) => (
                              <li key={index}><strong>{alert}</strong></li>
                            ))}
                          </ul>
                        </Alert>
                      </div>
                    </div>
                  </form>
                </ContributionSection>
                <ContributionSection
                  title={messages.sections.summary.title}
                  isOpen={sections.summary}
                  toggle={() => this.toggleSection('summary')}
                >
                  <form>
                    <div className="form-group">
                      <label htmlFor="summary"><strong>{messages.sections.summary.form.summary.label}</strong></label>
                      <ReactQuill value={newDrug.get('summary')} onChange={(e) => this.handleChange('summary', e)} />
                    </div>
                  </form>
                </ContributionSection>
                <ContributionSection
                  title={messages.sections.effects.title}
                  isOpen={sections.effects}
                  toggle={() => this.toggleSection('effects')}
                >
                  <form>
                    <div className="form-group">
                      <label htmlFor="effects">
                        <strong>{messages.sections.effects.form.effects.label}</strong>
                      </label>
                      <Query query={GET_EFFECTS}>
                            {({ loading, error, data }) => { //eslint-disable-line
                              if (loading) return <Spinner />
                              return (
                                <div className="card d-block mb-3">
                                  <div className="card-body">
                                    <input className="form-control" name="filter" type="text" placeholder={messages.sections.effects.form.filter.placeholder} />
                                  </div>
                                  <ul className="list-group list-group-flush d-block" style={{ maxHeight: 240, overflowY: 'auto' }}>
                                    {data.allEffects.map((effect) =>
                                      <button type="button" key={effect.id} className={classButton}>
                                        {effect.name}
                                        <FeatherIcon icon={'circle'} size={24} />
                                      </button>
                              )}
                                  </ul>
                                </div>
                              )
                            }}
                      </Query>
                    </div>
                  </form>
                </ContributionSection>
                <ContributionSection
                  title={messages.sections.health.title}
                  isOpen={sections.health}
                  toggle={() => this.toggleSection('health')}
                >
                  <form>
                    <div className="form-group">
                      <label htmlFor="health"><strong>{messages.sections.health.form.health.label}</strong></label>
                      <ReactQuill value={newDrug.get('health')} />
                    </div>
                  </form>
                </ContributionSection>
                <ContributionSection
                  title={messages.sections.law.title}
                  isOpen={sections.law}
                  toggle={() => this.toggleSection('law')}
                >
                  <form>
                    <div className="form-group">
                      <label htmlFor="law"><strong>{messages.sections.law.form.law.label}</strong></label>
                      <ReactQuill value={newDrug.get('law')} />
                    </div>
                  </form>
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

const GET_ROUTES = gql`
  query {
    __type (name: "Routes") {
      enumValues {
        name
      }
    }
  }
`

const GET_EFFECTS = gql`
  query {
    allEffects {
      name
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

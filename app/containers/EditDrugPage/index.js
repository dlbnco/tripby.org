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
import * as Icon from 'react-feather'
import { isEqual } from 'underscore'

import ConnectionError from '../../components/ConnectionError'
import PageHeader from '../../components/PageHeader'
import Spinner from '../../components/Spinner'
import Badge from '../../components/Badge'
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
  constructor() {
    super()
    this.converter = new Converter({ noHeaderId: true, simpleLineBreaks: true })
  }
  state = {
    sections: {
      basics: true,
    },
    forms: {
      aliases: '',
      alerts: '',
      effects: '',
    },
    changes: {},
    newDrug: {},
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.data.Drug && this.props.data.Drug) {
      this.buildDrugState()
    }
  }
  calculateDiff(property) {
    const { newDrug, changes } = this.state
    const { Drug } = this.props.data
    let changed
    if (!Drug[property]) {
      if (newDrug[property] === '' || newDrug[property] === '<p><br></p>') {
        changed = false
      } else {
        changed = true
      }
    } else if (property === 'summary' || property === 'health' || property === 'law') {
      changed = !isEqual(newDrug[property], this.converter.makeHtml(Drug[property]).replace(/(\r\n\t|\n|\r\t)/gm, ''))
    } else {
      changed = !isEqual(newDrug[property], Drug[property])
    }
    this.setState({
      changes: {
        ...changes,
        [property]: changed,
      },
    })
  }
  buildDrugState() {
    const { Drug } = this.props.data
    const drug = (JSON.parse(JSON.stringify(Drug)))
    const converter = this.converter
    Object.defineProperties(drug, {
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
    this.setState({
      newDrug: drug,
    })
  }
  handleChange(property, value) {
    const { newDrug } = this.state
    this.setState({
      newDrug: {
        ...newDrug,
        [property]: value,
      },
    }, () => this.calculateDiff(property))
  }
  handleAliases(e) {
    const { newDrug, forms } = this.state
    const { value } = e.target
    if (e.key === 'Enter') {
      const aliases = newDrug.aliases || []
      aliases.splice(0, 0, value)
      this.handleChange('aliases', aliases)
      this.setState({
        forms: {
          ...forms,
          aliases: '',
        },
      })
    } else {
      this.setState({
        forms: {
          ...forms,
          aliases: value,
        },
      })
    }
  }
  handleCategories(category) {
    const { newDrug } = this.state
    const classes = newDrug.classes
    const index = classes.findIndex((item) => item.id === category.id)
    if (index >= 0) {
      classes.splice(index, 1)
    } else {
      classes.push(category)
    }
    this.handleChange('classes', classes)
  }
  handleRoutes(route) {
    const { newDrug } = this.state
    const { routes } = newDrug
    const index = routes.findIndex((item) => (item.type === route.name || item.name === route.name))
    if (index >= 0) {
      routes.splice(index, 1)
    } else {
      routes.push(route)
    }
    this.handleChange('routes', routes)
  }
  handleAlerts(e) {
    const { newDrug, forms } = this.state
    const { value } = e.target
    if (e.key === 'Enter') {
      const alerts = newDrug.alerts || []
      alerts.splice(0, 0, value)
      this.handleChange('alerts', alerts)
      this.setState({
        forms: {
          alerts: '',
        },
      })
    } else {
      this.setState({
        forms: {
          ...forms,
          alerts: value,
        },
      })
    }
  }
  handleEffects(effect) {
    const { newDrug } = this.state
    const effects = newDrug.effects
    const index = effects.findIndex((item) => (item.id === effect.id))
    if (index >= 0) {
      effects.splice(index, 1)
    } else {
      effects.push(effect)
    }
    this.handleChange('effects', effects)
  }
  toggleSection(id) {
    const { sections } = this.state
    sections[id] = !sections[id]
    this.setState({ sections })
  }
  render() {
    const { data } = this.props
    const { loading, Drug } = data
    const { sections, newDrug, forms, changes } = this.state
    const listButtonClassnames = {
      'list-group-item': true,
      'list-group-item-action': true,
      'd-flex': true,
      'align-items-center': true,
      'justify-content-between': true,
    }
    const classButton = (category) => classnames({
      ...listButtonClassnames,
      active: newDrug.classes.some((item) => item.id === category.id),
    })
    const routeButton = (route) => classnames({
      ...listButtonClassnames,
      active: newDrug.routes.some((item) => (item.type === route.name) || (item.name === route.name)),
    })
    const effectButton = (effect) => classnames({
      ...listButtonClassnames,
      active: newDrug.effects.some((item) => item.id === effect.id),
    })
    return (
      <div>
        <Helmet
          title={messages.meta.title}
          meta={[
            { name: 'description', content: messages.meta.description },
          ]}
        />
        {data.networkStatus === 8 && (
          <ConnectionError />
        )}
        {loading === false && Drug && newDrug && (
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
                          <input value={newDrug.name} onChange={(e) => this.handleChange('name', e.target.value)} type="text" name="name" className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name"><strong>{messages.sections.basics.form.aliases.label}</strong></label>
                          <input
                            type="text"
                            name="alias"
                            className="form-control form-control-lg"
                            placeholder={messages.sections.basics.form.aliases.placeholder}
                            onKeyPress={(e) => this.handleAliases(e)}
                            onChange={(e) => this.handleAliases(e)}
                            value={forms.aliases}
                          />
                          <div className="badge-group mt-3">
                            {newDrug.aliases && newDrug.aliases.map((alias, index) =>
                              <Badge
                                key={`${alias}-${index}`}
                                bg="pinkLighter"
                                close={() => this.handleChange('aliases', newDrug.aliases.filter((string) => string !== alias))}
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
                                  {data.allCategories && data.allCategories.map((category) =>
                                    <button
                                      type="button"
                                      key={category.id}
                                      className={classButton(category)}
                                      onClick={() => this.handleCategories(category)}
                                    >
                                      {category.title}
                                      {newDrug.classes.some((item) => item.id === category.id) ? <Icon.CheckCircle /> : <Icon.Circle />}
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
                                    <button
                                      type="button"
                                      key={route.name}
                                      className={routeButton(route)}
                                      onClick={() => this.handleRoutes(route)}
                                    >
                                      {route.name}
                                      {newDrug.routes.some((item) => item.type === route.name || item.name === route.name) ? <Icon.CheckCircle /> : <Icon.Circle />}
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
                          <input
                            type="text"
                            name="alert"
                            className="form-control form-control-lg"
                            placeholder={messages.sections.basics.form.aliases.placeholder}
                            value={forms.alerts}
                            onKeyPress={(e) => this.handleAlerts(e)}
                            onChange={(e) => this.handleAlerts(e)}
                          />
                        </div>
                        <Alert type="danger" icon="warning">
                          <ul className="m-0 pl-4">
                            {newDrug.alerts && newDrug.alerts.map((alert, index) => (
                              <li key={index} className="line-height-1 d-flex align-items-start justify-content-between py-2">
                                <strong>{alert}</strong>
                                <Icon.X
                                  size={16}
                                  className="cursor-pointer"
                                  onClick={() => this.handleChange('alerts', newDrug.alerts.filter((item) => item !== alert))}
                                />
                              </li>
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
                      <ReactQuill
                        value={newDrug.summary}
                        onChange={(e) => this.handleChange('summary', e)}
                      />
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
                                <input
                                  className="form-control"
                                  name="filterEffects"
                                  type="text"
                                  placeholder={messages.sections.effects.form.filter.placeholder}
                                  value={forms.effects}
                                  onChange={(e) => this.setState({ forms: { effects: e.target.value } })}
                                />
                              </div>
                              <ul className="list-group list-group-flush d-block" style={{ maxHeight: 240, overflowY: 'auto' }}>
                                {data.allEffects && data.allEffects.filter((item) => item.name.toLowerCase().indexOf(forms.effects.toLowerCase()) !== -1).map((effect) =>
                                  <button
                                    type="button"
                                    key={effect.id}
                                    className={effectButton(effect)}
                                    onClick={() => this.handleEffects(effect)}
                                  >
                                    {effect.name}
                                    {newDrug.effects.some((item) => item.id === effect.id) ? <Icon.CheckCircle /> : <Icon.Circle />}
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
                      <ReactQuill
                        value={newDrug.health}
                        onChange={(e) => this.handleChange('health', e)}
                      />
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
                      <ReactQuill
                        value={newDrug.law}
                        onChange={(e) => this.handleChange('law', e)}
                      />
                    </div>
                  </form>
                </ContributionSection>
                {Object.keys(changes).filter((key) => changes[key] === true).length > 0 && (
                  <div className="alert alert-info bg-blueLighter animate-reveal--up mt-3">
                    <div className="card-body d-flex align-items-end justify-content-between">
                      <div>
                        <h5>{messages.sections.changes.title}</h5>
                        <ul className="pl-3 mb-0">
                          {Object.keys(changes).filter((key) => changes[key] === true).map((change) => {
                            const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase()
                            return (<li>
                              {capitalize(change)}
                            </li>)
                          })}
                        </ul>
                      </div>
                      <div>
                        <button className="btn d-flex align-items-center bg-green ">
                          <div className="text-greyDark">Submit</div>
                          <Icon.CheckCircle size={20} className="ml-2 text-greyDark" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
          )}
        {loading && (
          <Spinner />
        )}
      </div>
    )
  }
}

EditDrugPage.propTypes = {
  data: PropTypes.object,
}

const GET_CATEGORIES = gql`
  query {
    allCategories {
      id
      title
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
        id
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

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
import { graphql, Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Collapse } from 'reactstrap'
import classnames from 'classnames'
import ReactQuill from 'react-quill'
import { Converter } from 'showdown'
import * as Icon from 'react-feather'
import { isEqual } from 'underscore'
import TurndownService from 'turndown'
import { TabList, Tab, Tabs, TabPanel } from 'react-tabs'

import ErrorAlert from '../../components/ErrorAlert'
import PageHeader from '../../components/PageHeader'
import Spinner from '../../components/Spinner'
import Badge from '../../components/Badge'
import Alert from '../../components/Alert'

import messages from './messages'
import EditRoutes from './EditRoutes'

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
    this.turndownService = new TurndownService({ headingStyle: 'atx' })
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
        value: converter.makeHtml(Drug.summary || ''),
        writable: true,
      },
      health: {
        value: converter.makeHtml(Drug.health || ''),
        writable: true,
      },
      law: {
        value: converter.makeHtml(Drug.law || ''),
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
          ...forms,
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
    const { newDrug, forms, changes } = this.state
    const userIsAdmin = this.props.user.id && this.props.user.role === 'Admin'
    const changed = Object.keys(changes).length > 0 && Object.keys(changes).filter((key) => changes[key] === true).length > 0
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
          <ErrorAlert type="connection" />
        )}
        {!userIsAdmin && (
          <ErrorAlert type="unauthorized" />
        )}
        {userIsAdmin && !loading && Drug && newDrug && (
          <div>
            <PageHeader>
              <FormattedMessage values={{ drug: Drug.name }} {...messages.header} />
            </PageHeader>
            <section className="py-3 py-md-4">
              <div className="container">
                <Tabs className="react-tabs--edit-drug">
                  <TabList>
                    <Tab>
                      {messages.sections.basics.title}
                    </Tab>
                    <Tab>
                      {messages.sections.summary.title}
                    </Tab>
                    <Tab>
                      {messages.sections.routes.title}
                    </Tab>
                    <Tab>
                      {messages.sections.effects.title}
                    </Tab>
                    <Tab>
                      {messages.sections.health.title}
                    </Tab>
                    <Tab>
                      {messages.sections.law.title}
                    </Tab>
                  </TabList>
                  <div className="row">
                    <div className={`col-12 ${changed ? 'col-md-7 col-lg-8' : 'mt-3'}`}>
                      <TabPanel>
                        <form>
                          <div className="row mt-3">
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
                      </TabPanel>
                      <TabPanel>
                        <form>
                          <div className="form-group">
                            <ReactQuill
                              value={newDrug.summary}
                              onChange={(e) => this.handleChange('summary', e)}
                            />
                          </div>
                        </form>
                      </TabPanel>
                      <TabPanel>
                        <EditRoutes Drug={Drug} routes={Drug.routes} />
                      </TabPanel>
                      <TabPanel>
                        <form>
                          <div className="form-group">
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
                                      <ul className="list-group list-group-flush d-block" style={{ overflowY: 'auto' }}>
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
                      </TabPanel>
                      <TabPanel>
                        <form>
                          <div className="form-group">
                            <ReactQuill
                              value={newDrug.health}
                              onChange={(e) => this.handleChange('health', e)}
                            />
                          </div>
                        </form>
                      </TabPanel>
                      <TabPanel>
                        <form>
                          <div className="form-group">
                            <ReactQuill
                              value={newDrug.law}
                              onChange={(e) => this.handleChange('law', e)}
                            />
                          </div>
                        </form>
                      </TabPanel>
                    </div>
                    {changed && (
                      <div className="col-12 col-md-5 col-lg-4">
                        <div className="alert alert-info bg-blueLighter animate-reveal--up mt-3 mt-md-0">
                          <div className="card-body d-flex align-items-end justify-content-between">
                            <div>
                              <h5>{messages.sections.submit.title}</h5>
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
                              <Mutation
                                mutation={UPDATE_DRUG}
                                variables={{
                                  alerts: newDrug.alerts,
                                  aliases: newDrug.aliases,
                                  classesIds: newDrug.classes.reduce((acc, val) => {
                                    acc.push(val.id)
                                    return acc
                                  }, []),
                                  effectsIds: newDrug.effects.reduce((acc, val) => {
                                    acc.push(val.id)
                                    return acc
                                  }, []),
                                  id: Drug.id,
                                  health: this.turndownService.turndown(newDrug.health),
                                  law: this.turndownService.turndown(newDrug.law),
                                  name: newDrug.name,
                                  routes: newDrug.routes.reduce((acc, val) => {
                                    const durationsIds = []
                                    if (val.durations) {
                                      val.durations.forEach((duration) => durationsIds.push(duration.id))
                                    }
                                    if (val.id) {
                                      const obj = {}
                                      if (val.dosage) {
                                        obj.dosageId = val.dosage.id
                                      }
                                      acc.push({
                                        ...obj,
                                        type: val.type,
                                        durationsIds,
                                      })
                                    } else {
                                      acc.push({ type: val.name })
                                    }
                                    return acc
                                  }, []),
                                  summary: this.turndownService.turndown(newDrug.summary),
                                }}
                              >
                                {(createDrug, { loading }) => ( // eslint-disable-line
                                  <button
                                    onClick={() => !loading && createDrug()}
                                    className="btn d-flex align-items-center bg-green"
                                  >
                                    {loading ? messages.sections.submit.loading : <div className="text-greyDark">Submit</div>}
                                    <Icon.CheckCircle size={20} className="ml-2 text-greyDark" />
                                  </button>
                              )}
                              </Mutation>
                            </div>
                          </div>
                        </div>
                      </div>
                      )}
                  </div>
                </Tabs>
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
  user: PropTypes.object,
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

const UPDATE_DRUG = gql`
  mutation(
    $id: ID!,
    $alerts: [String!],
    $aliases: [String!],
    $classesIds: [ID!],
    $effectsIds: [ID!],
    $health: String,
    $law: String,
    $name: String!,
    $routes: [DrugroutesRoute!],
    $summary: String,
    ) {
    updateDrug(
      id: $id,
      alerts: $alerts,
      aliases: $aliases,
      classesIds: $classesIds,
      effectsIds: $effectsIds,
      health: $health,
      law: $law,
      name: $name,
      routes: $routes,
      summary: $summary
    ) {
      id
    }
  }
`

export const Drug = gql`
  query getDrug($id: ID!) {
    Drug(id: $id) {
      id
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
          id
          onset
          comeUp
          peak
          comeDown
          total
          afterEffects
        }
        dosage {
          id
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


const mapStateToProps = (state) => {
  if (state.get('auth0')) {
    return {
      user: state.get('auth0'),
    }
  } return { userId: null }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default graphql(Drug, { options: ({ params }) => ({ variables: { id: params.drug } }) })(connect(mapStateToProps, mapDispatchToProps)(EditDrugPage))

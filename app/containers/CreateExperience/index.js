/*
 *
 * CreateExperience
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { graphql, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import classnames from 'classnames'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import TurndownService from 'turndown'

import messages from './messages'
import PageHeader from '../../components/PageHeader'
import FeatherIcon from '../../components/FeatherIcon'
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import GateKeeper from '../../components/GateKeeper'

export class CreateExperience extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      selectedDrugs: [],
      filter: '',
      title: '',
      story: '',
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleInputs = this.handleInputs.bind(this)
  }
  componentDidUpdate(prevProps, prevState) {
    // Focus title input when form loads, and only in the first time.
    if (this.titleInput && prevState === this.state) {
      this.titleInput.focus()
    }
  }
  handleSelect(drug) {
    const { selectedDrugs } = this.state
    const index = selectedDrugs.indexOf(drug)
    if (index === -1) {
      selectedDrugs.push(drug)
    } else {
      selectedDrugs.splice(index, 1)
    }
    this.setState({ selectedDrugs })
  }
  handleInputs(e) {
    this.setState({ [e.target.name || e.target.id]: e.target.value })
  }
  render() {
    const CREATE_EXPERIENCE = gql`
      mutation createExperience($authorId: ID!, $title: String!, $story: String!, $drugsIds: [ID!]){
        createExperience(
          title: $title,
          story: $story,
          drugsIds: $drugsIds
          authorId: $authorId
        ) {
          id
        }
      }
    `
    const drugButton = (drug) => classnames({
      'list-group-item': true,
      'list-group-item-action': true,
      'd-flex': true,
      'align-items-center': true,
      'justify-content-between': true,
      active: this.state.selectedDrugs.indexOf(drug) >= 0,
    })
    const allDrugs = this.props.data.allDrugs || []
    const drugs = allDrugs.filter((drug) => drug.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
    return (
      <div>
        <Helmet
          title="CreateExperience"
          meta={[
            { name: 'description', content: 'Description of CreateExperience' },
          ]}
        />
        <PageHeader>
          <FormattedMessage {...messages.header} />
        </PageHeader>
        <div className="container">
          {this.props.userId ? (
            <section className="py-4 py-md-5">

              <Mutation
                mutation={CREATE_EXPERIENCE}
                onCompleted={(data) => { browserHistory.push(`/experiences/create/success?id=${data.createExperience.id}`) }}
                onError={() => { window.scrollTo(0, 0) }}
              >
                {(createExperience, { loading, error }) => (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      const turndownService = new TurndownService({ headingStyle: 'atx' })
                      const story = turndownService.turndown(this.state.story)
                      createExperience({
                        variables: {
                          title: e.target.title.value,
                          story,
                          drugsIds: this.state.selectedDrugs.reduce((arr, drug) => {
                            arr.push(drug.id)
                            return arr
                          }, []),
                          authorId: this.props.userId,
                        },
                      })
                    }
                  }
                  >
                    {error ?
                      <div className="my-4"><Alert type="danger">
                        <h5>Algo deu errado</h5>
                        <ul className="m-0">
                          {error.graphQLErrors.map((err) => (
                            <li>{err.message}</li>
                        ))}
                        </ul>
                      </Alert></div>
                    : null}
                    <div className="row">
                      <div className="col-12 col-md-8">
                        <div className="form-group">
                          <label htmlFor="title"><h5>Título da experiência</h5></label>
                          <input ref={(input) => { this.titleInput = input }} onChange={this.handleInputs} type="text" id="title" name="title" className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="story"><h5>Conte a história da experiência</h5></label>
                          <ReactQuill tabIndex={-1} defaultValue={this.state.story} onChange={(e) => this.handleInputs({ target: { value: e, name: 'story' } })} />
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        {!this.props.data.loading ? (
                          <div className="form-group">
                            <label htmlFor="filter"><h5><FormattedMessage {...messages.drugSelection} /></h5></label>
                            <div className="card d-block mb-3">
                              <div className="card-body">
                                <input className="form-control" name="filter" type="text" placeholder="Filtrar..." onChange={this.handleInputs} value={this.state.filter} />
                              </div>
                              <ul className="list-group list-group-flush d-block" style={{ maxHeight: 240, overflowY: 'auto' }}>
                                {drugs.map((drug) =>
                                  <button type="button" key={drug.id} onClick={() => this.handleSelect(drug)} className={drugButton(drug)}>
                                    {drug.name}
                                    <FeatherIcon icon={this.state.selectedDrugs.indexOf(drug) >= 0 ? 'check-circle' : 'circle'} size={24} />
                                  </button>
                                )}
                              </ul>
                            </div>
                            {this.state.selectedDrugs.map((drug) =>
                              <div key={drug.id} className="d-inline-flex mr-2 mb-2"><Badge close={() => this.handleSelect(drug)} bg="pinkLight">{drug.name}</Badge></div>
                            )}
                          </div>
                          )
                            : <Spinner />}
                      </div>
                      <div className="col-12">
                        <div className="d-inline-flex align-items-center">
                          <Button btnStyle="primary" type="submit" disabled={loading || this.state.selectedDrugs.length === 0 || this.state.title === '' || this.state.story === ''}>
                            Continuar
                          </Button>
                          {loading ? <span className="ml-2"><Spinner /></span> : null}
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Mutation>
            </section>
          ) : (
            <GateKeeper location={this.props.location} />
          )}
        </div>
      </div>
    )
  }

}

CreateExperience.propTypes = {
  dispatch: PropTypes.func.isRequired, //eslint-disable-line
  data: PropTypes.object,
  userId: PropTypes.string,
  location: PropTypes.object,
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

function mapStateToProps(state) {
  if (state.get('auth0')) {
    return {
      userId: state.get('auth0').id,
    }
  } return { userId: null }
}

const Drugs = gql(`
  query {
    allDrugs {
      id
      name
      aliases
    }
  }
`)

export default graphql(Drugs)(connect(mapStateToProps, mapDispatchToProps)(CreateExperience))

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
import SimpleMDE from 'react-simplemde-editor'
import 'simplemde/dist/simplemde.min.css'

import messages from './messages'
import PageHeader from '../../components/PageHeader'
import FeatherIcon from '../../components/FeatherIcon'
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import Button from '../../components/Button'

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
    this.setTextarea = (e) => {
      this.storyTextarea = e
    }
  }
  handleSelect(id) {
    const drugs = this.state.selectedDrugs
    const index = drugs.indexOf(id)
    if (index === -1) {
      drugs.push(id)
    } else {
      drugs.splice(index, 1)
    }
    this.setState({ selectedDrugs: drugs })
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
    const drugButton = (id) => classnames({
      'list-group-item': true,
      'list-group-item-action': true,
      'd-flex': true,
      'align-items-center': true,
      'justify-content-between': true,
      active: this.state.selectedDrugs.indexOf(id) >= 0,
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
          <section className="py-4 py-md-5">
            <h5><FormattedMessage {...messages.drugSelection} /></h5>
            <Mutation
              mutation={CREATE_EXPERIENCE}
              onCompleted={(data) => { browserHistory.push(`/experiences/create/success?id=${data.createExperience.id}`) }}
              onError={() => { window.scrollTo(0, 0) }}
            >
              {(createExperience, { loading, error }) => (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    createExperience({
                      variables: {
                        title: e.target.title.value,
                        story: this.state.story,
                        drugsIds: this.state.selectedDrugs,
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
                  <div className="form-group">
                    {!this.props.data.loading ? (
                      <div className="card d-block">
                        <div className="card-body">
                          <input className="form-control" name="filter" type="text" placeholder="Filtrar..." onChange={this.handleInputs} value={this.state.filter} />
                        </div>
                        <ul className="list-group list-group-flush d-block" style={{ maxHeight: 240, overflowY: 'auto' }}>
                          {drugs.map((drug) =>
                            <button type="button" key={drug.id} onClick={() => this.handleSelect(drug.id)} className={drugButton(drug.id)}>
                              {drug.name}
                              <FeatherIcon icon={this.state.selectedDrugs.indexOf(drug.id) >= 0 ? 'check-circle' : 'circle'} size={24} />
                            </button>
                          )}
                        </ul>
                      </div>)
                      : <Spinner />}
                  </div>
                  <div className="form-group">
                    <label htmlFor="title"><h5>Título da experiência</h5></label>
                    <input onChange={this.handleInputs} type="text" id="title" name="title" className="form-control form-control-lg" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="story"><h5>Conte a história da experiência</h5></label>
                    {/* <textarea ref={this.storyTextarea} name="story" id="story" className="form-control" onChange={this.handleInputs}></textarea> */}
                    <SimpleMDE id="story" options={{ spellChecker: false }} onChange={(e) => this.handleInputs({ target: { value: e, name: 'story' } })} />
                  </div>
                  <div className="d-inline-flex align-items-center">
                    <Button type="submit" disabled={loading || this.state.selectedDrugs.length === 0 || this.state.title === '' || this.state.story === ''}>
                      Continuar
                    </Button>
                    {loading ? <span className="ml-2"><Spinner /></span> : null}
                  </div>
                </form>
              )}
            </Mutation>
          </section>
        </div>
      </div>
    )
  }

}

CreateExperience.propTypes = {
  dispatch: PropTypes.func.isRequired, //eslint-disable-line
  data: PropTypes.object,
  userId: PropTypes.string,
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

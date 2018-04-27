/*
 *
 * CreateExperience
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import classnames from 'classnames'
import SimpleMDE from 'react-simplemde-editor'
import 'simplemde/dist/simplemde.min.css'

import messages from './messages'
import PageHeader from '../../components/PageHeader'
import FeatherIcon from '../../components/FeatherIcon'
import Spinner from '../../components/Spinner'
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
  componentDidMount() {
    const simplemde = new SimpleMDE({
      element: this.storyTextarea,
      forceSync: true,
      spellChecker: false,
    })
    simplemde.value()
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
          <section className="py-4 py-md-5"><h5><FormattedMessage {...messages.drugSelection} /></h5>
            <form><div className="form-group">
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
              <Button type="submit" disabled={this.state.selectedDrugs.length === 0 || this.state.title === '' || this.state.story === ''}>
              Continuar
            </Button>
            </form></section>
        </div>
      </div>
    )
  }

}

CreateExperience.propTypes = {
  dispatch: PropTypes.func.isRequired, //eslint-disable-line
  data: PropTypes.object,
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
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

export default graphql(Drugs)(connect(null, mapDispatchToProps)(CreateExperience))

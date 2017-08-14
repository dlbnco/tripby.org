/*
*
* DrugPage
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Helmet from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import makeSelectDrugPage from './selectors'
import Spinner from '../../components/Spinner'
import DrugHeader from '../../components/DrugHeader'

export class DrugPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.handleTabs = this.handleTabs.bind(this)
    this.state = {
      drugObject: {
        title: {
          rendered: '',
        },
      },
      colorScheme: [],
      selectedTab: 0,
      loading: true,
      error: null,
    }
  }
  componentDidMount() {
    const that = this
    axios.get('http://tripby.org/wp-json/wp/v2/pages', {
      params: {
        slug: this.props.params.drug,
      },
    })
    .then((response) => {
      that.setState({ drugObject: response.data[0], loading: false })
    })
    .catch(() => {
      that.setState({ error: 'Desculpe, não foi possível fazer o corre das informações' })
    })
  }
  theDrug() {
    if (this.state.loading && this.state.error == null) {
      return (
        <Spinner className="mx-auto" />
      )
    } else if (this.state.error !== null) {
      return (
        <div className="col text-center">
          😥<br />{this.state.error}
        </div>
      )
    } return (
      <div>
        <DrugHeader handleTabs={this.handleTabs} drugName={this.state.drugObject.title.rendered} drugNicknames={this.state.drugObject.acf.drug_popular_names} drugClass={this.state.drugObject.acf.drug_type} drugRoutes={this.state.drugObject.acf.drug_roa} drugMolecule={this.state.drugObject.acf.drug_molecule_grey} />
        <div className="container">
          <section className="section--tight">
            {this.theTab()}
          </section>
        </div>
      </div>
    )
  }
  /* eslint-disable react/no-danger */
  theTab() {
    if (this.state.selectedTab === 1) {
      return (
        <div dangerouslySetInnerHTML={{ __html: this.state.drugObject.acf.effects }} />
      )
    } else if (this.state.selectedTab === 2) {
      return (
        <div dangerouslySetInnerHTML={{ __html: this.state.drugObject.acf.dosage }} />
      )
    } else if (this.state.selectedTab === 3) {
      return (
        <div dangerouslySetInnerHTML={{ __html: this.state.drugObject.acf.health }} />
      )
    } else if (this.state.selectedTab === 4) {
      return (
        <div dangerouslySetInnerHTML={{ __html: this.state.drugObject.acf.law }} />
      )
    } else if (this.state.selectedTab === 5) {
      return (
        <div dangerouslySetInnerHTML={{ __html: this.state.drugObject.acf['more-info'] }} />
      )
    }
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.drugObject.acf.intro }} />
    )
  }
  handleTabs(event) {
    this.setState({ selectedTab: event })
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>{this.state.loading ? 'TRIPBY' : `${this.state.drugObject.title.rendered} – efeitos, duração, dose, saúde e lei`}</title>
        </Helmet>
        {this.theDrug()}
      </div>
    )
  }

}

DrugPage.propTypes = {
  params: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  DrugPage: makeSelectDrugPage(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugPage)

import React from 'react'
import DrugHeader from './DrugHeader'
import axios from 'axios'
import Spinner from './Spinner'
import Helmet from 'react-helmet'

class Drug extends React.Component{
  constructor() {
    super()
    this.handleTabs = this.handleTabs.bind(this)
    this.state = {
      drugObject: {
        title: {
          rendered: ''
        }
      },
      colorScheme: [],
      selectedTab: 0,
      loading: true,
      error: null
    }
  }
  theTab() {
    if (this.state.selectedTab == 1) {
      return (
        <div dangerouslySetInnerHTML={{__html: this.state.drugObject.acf.effects}}></div>
      )
    }
    else if (this.state.selectedTab == 2) {
      return (
        <div dangerouslySetInnerHTML={{__html: this.state.drugObject.acf.dosage}}></div>
      )
    }
    else if (this.state.selectedTab == 3) {
      return (
        <div dangerouslySetInnerHTML={{__html: this.state.drugObject.acf.health}}></div>
      )
    }
    else if (this.state.selectedTab == 4) {
      return (
        <div dangerouslySetInnerHTML={{__html: this.state.drugObject.acf.law}}></div>
      )
    }
    else if (this.state.selectedTab == 5) {
      return (
        <div dangerouslySetInnerHTML={{__html: this.state.drugObject.acf['more-info']}}></div>
      )
    }
    else return (
      <div dangerouslySetInnerHTML={{__html: this.state.drugObject.acf.intro}}></div>
    )
  }
  theDrug() {
    if (this.state.loading && this.state.error == null) {
      return (
        <Spinner className="mx-auto" />
      )
    } else if (this.state.error !== null) {
      return (
        <div className="col text-center">
          😥<br />
        {this.state.error}
      </div>
    )
  } else {
    return (
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
}
handleTabs(event) {
  this.setState({selectedTab: event})
}

render () {
  return (
    <div>
      <Helmet>
        <title>{this.state.loading ? 'TRIPBY' : this.state.drugObject.title.rendered + ' – efeitos, duração, dose, saúde e lei'}</title>
      </Helmet>
      {this.theDrug()}
    </div>
  )
}
componentDidMount(){
  var that = this;
  axios.get('http://tripby.org/wp-json/wp/v2/pages', {
    params: {
      slug: this.props.params.drug
    }
  })
  .then(function (response) {
    console.log(response.data)
    that.setState({drugObject: response.data[0], loading: false})
  })
  .catch(function (error) {
    that.setState({error: 'Desculpe, não foi possível fazer o corre das informações'})
  });
}
}

export default Drug

import React from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'
import Spinner from './Spinner'

class Article extends React.Component{
  constructor() {
    super()
    this.state = {
      loading: true,
      error: null
    }
  }
  theArticle () {
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
        <div className="container">
          <section className="section--tight">
            <h1><strong>{this.state.articleObject.title.rendered}</strong></h1>
            <div dangerouslySetInnerHTML={{__html: this.state.articleObject.content.rendered}}></div>
          </section>
        </div>
      </div> )
    }
  }
  render () {
    return (
      <div>
        <Helmet>
          <title>{this.state.loading ? 'TRIPBY' : this.state.articleObject.title.rendered}</title>
        </Helmet>
        {this.theArticle()}
      </div>
    )
  }
  componentDidMount() {
    var that = this;
    axios.get('http://tripby.org/wp-json/wp/v2/articles', {
      params: {
        slug: this.props.params.article
      }
    })
    .then(function (response) {
      console.log(response.data)
      that.setState({articleObject: response.data[0], loading: false})
    })
    .catch(function (error) {
      that.setState({error: 'Desculpe, não foi possível fazer o corre das informações'})
    });
  }
}

export default Article

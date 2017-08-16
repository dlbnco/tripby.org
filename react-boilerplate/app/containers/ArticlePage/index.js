/*
*
* ArticlePage
*
*/

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Helmet from 'react-helmet'
import Spinner from '../../components/Spinner'

export class ArticlePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      loading: true,
      error: null,
    }
  }
  componentDidMount() {
    const that = this
    axios.get('http://tripby.org/wp-json/wp/v2/articles', {
      params: {
        slug: this.props.params.article,
      },
    })
    .then((response) => {
      that.setState({ articleObject: response.data[0], loading: false })
    })
    .catch(() => {
      that.setState({ error: 'Desculpe, não foi possível fazer o corre das informações' })
    })
  }
  theArticle() {
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
        <div className="container">
          <section className="section--tight">
            <h1><strong>{this.state.articleObject.title.rendered}</strong></h1>
            {/* eslint-disable react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: this.state.articleObject.content.rendered }} />
          </section>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>{this.state.loading ? 'TRIPBY' : this.state.articleObject.title.rendered}</title>
        </Helmet>
        {this.theArticle()}
      </div>
    )
  }

}

ArticlePage.propTypes = {
  params: PropTypes.object,
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(null, mapDispatchToProps)(ArticlePage)

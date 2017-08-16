/*
*
* ListArticles
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Spinner from '../../components/Spinner'
import ArticleCard from '../../components/ArticleCard'

export class ListArticles extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      articleArray: [],
      loading: true,
      error: null,
    }
  }
  componentDidMount() {
    const that = this
    // first call
    // get drug info from WordPress API
    axios.get('http://tripby.org/wp-json/wp/v2/articles', {
      params: {
        order: 'desc',
        orderby: 'date',
        per_page: this.props.perPage,
        categories: this.props.categories,
      },
    })
    .then((response) => {
      // set state with info from response
      const articleArr = response.data
      that.setState({ articleArray: articleArr, loading: false })
    })
    .catch(() => {
      that.setState({ error: 'Desculpe, não foi possível fazer o corre das informações' })
    })
  }
  theArticles() {
    const articles = this.state.articleArray.map((article, index) => (
      <div className="col-12 col-md-6 col-lg-4" key={index}>
        <ArticleCard slug={article.slug} thumbId={article.featured_media} key={index} title={article.title.rendered} excerpt={article.excerpt.rendered} />
      </div>)
    )
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
    } return articles
  }
  render() {
    return (
      <div>
        <div className="row">
          {this.theArticles()}
        </div>
      </div>
    )
  }
}

ListArticles.propTypes = {
  perPage: PropTypes.number,
  categories: PropTypes.arrayOf(PropTypes.number),
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(null, mapDispatchToProps)(ListArticles)

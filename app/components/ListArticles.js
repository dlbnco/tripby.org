import React from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import LinkButton from './LinkButton'
import ArticleCard from './ArticleCard'

class ListArticles extends React.Component{
  constructor() {
    super()
    this.state = {
      articleArray: [],
      loading: true,
      error: null
    }
  }
  theArticles() {
    const articles = this.state.articleArray.map( ( article, index ) =>
    <div className="col-12 col-md-6 col-lg-4" key={index}>
      <ArticleCard slug={article.slug} thumbId={article.featured_media} key={index} title={article.title.rendered} excerpt={article.excerpt.rendered}/>
    </div> )
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
    } else return articles
    }
    render () {
      return (
        <div>
          <div className="row">
            {this.theArticles()}
          </div>
        </div>
      )
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
          categories: this.props.categories
        }
      })
      .then(function (response) {
        // set state with info from response
        let articleArray = response.data
        that.setState({articleArray: articleArray, loading: false})
      })
      .catch(function (error) {
        console.log(error)
        that.setState({error: 'Desculpe, não foi possível fazer o corre das informações'})
      });
    }
  }

  export default ListArticles

/**
*
* ArticleCard
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router'

class ArticleCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {
    const that = this
    axios.get('http://tripby.org/wp-json/wp/v2/media?_embed', {
      params: {
        include: this.props.thumbId,
      },
    }).then((response) => {
      that.setState({
        thumbnailUrl: response.data[0].media_details.sizes.large.source_url,
      })
    }
  ).catch(() => {
    that.setState({ error: 'Desculpe, não foi possível fazer o corre das informações' })
  })
  }
  render() {
    const thumbStyle = {
      backgroundImage: `url('${this.state.thumbnailUrl}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: 192,
    }
    return (
      <Link to={`/artigos/${this.props.slug}`} className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-img-top" style={thumbStyle} />
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h4 className="tbBlue-text">{this.props.title}</h4>
              { /* eslint-disable react/no-danger */ }
              <div className="mb-0" dangerouslySetInnerHTML={{ __html: this.props.excerpt }}></div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

ArticleCard.propTypes = {
  thumbId: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
}

export default ArticleCard

/**
*
* ArticleCard
*
*/

import React from 'react';
// import styled from 'styled-components';


class ArticleCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {

    }
  }
  render () {
    const thumbStyle = {
      backgroundImage: 'url(\'' + this.state.thumbnailUrl + '\')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: 192
    }
    return (
      <Link to={'/artigos/' + this.props.slug} className="card" style={{marginBottom: '1rem'}}>
        <div className="card-img-top" style={thumbStyle} />
        <div className="card-block">
          <div className="row">
            <div className="col">
              <h4 className="tbBlue-text">{this.props.title}</h4>
              <div className="mb-0" dangerouslySetInnerHTML={{__html: this.props.excerpt}}></div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
  componentDidMount() {
    let that = this
    axios.get('http://tripby.org/wp-json/wp/v2/media?_embed', {
      params: {
        include: this.props.thumbId
      }
    }).then(function (response) {
      that.setState({
        thumbnailUrl: response.data[0].media_details.sizes.large.source_url
      })
    }
  ).catch(function(err) {
      that.setState({error: 'Desculpe, não foi possível fazer o corre das informações'})
    })
  }
}

ArticleCard.propTypes = {

};

export default ArticleCard;

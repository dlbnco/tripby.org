import React, { PropTypes } from 'react'
import {Helmet} from 'react-helmet'
import FeaturedContent from './FeaturedContent'
import ImageWithCaption from './ImageWithCaption'
import LinkButton from './LinkButton'
import ListDrugs from './ListDrugs'

class Home extends React.Component{
  render () {
    return (
      <div>
        <section>
          <FeaturedContent tagline="Faça uma doação e ganhe um pack de adesivos">
            <LinkButton text="DOAR" link="/experimente" campaign arrow/>
          </FeaturedContent>
        </section>
        <section className="section--tight">
          <div className="container">
            <ListDrugs perPage={4}/>
            <LinkButton text="Mais" link="/psicoativos" arrow/>
          </div>
        </section>
      </div>
    )
  }
}

export default Home

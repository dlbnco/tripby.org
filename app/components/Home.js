import React from 'react'
import {Helmet} from 'react-helmet'
import FeaturedContent from './FeaturedContent'
import ImageWithCaption from './ImageWithCaption'
import LinkButton from './LinkButton'
import ListDrugs from './ListDrugs'
import ListArticles from './ListArticles'

class Home extends React.Component{
  render () {
    return (
      <div>
          <FeaturedContent tagline="Leia a bula." subtagline="Saiba como contribuir com o TRIPBY">
            <LinkButton text="Contribuir" link="/contribuir" campaign icon="trending_flat"/>
            </FeaturedContent>
        <section className="section grey--lighter">
          <div className="container">
            <h3 className="pb-3">Psicoativos</h3>
            <ListDrugs perPage={6}/>
          </div>
        </section>
        <section className="section grey--lighter">
          <div className="container">
            <h3 className="pb-3">Redução de danos</h3>
            <ListArticles perPage={6} categories={[35]}/>
          </div>
        </section>
        <section className="section grey--lighter">
          <div className="container">
            <h3 className="pb-3">DIY</h3>
            <ListArticles perPage={6} categories={[167]}/>
          </div>
        </section>
      </div>
    )
  }
}

export default Home

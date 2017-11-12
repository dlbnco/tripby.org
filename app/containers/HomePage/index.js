/*
* HomePage
*
* This is the first thing users see of our App, at the '/' route
*
* NOTE: while this component should technically be a stateless functional
* component (SFC), hot reloading does not currently support SFCs. If hot
* reloading is not a necessity for you then you can refactor it and remove
* the linting exception.
*/

import React from 'react'
import FeaturedContent from '../../components/FeaturedContent'
import Button from '../../components/Button'
import ListDrugs from '../../components/ListDrugs'

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FeaturedContent tagline="Leia a bula." subtagline="Saiba como contribuir com o TRIPBY">
          <Button campaign icon="trending_flat">Contribuir</Button>
        </FeaturedContent>
        <section className="py-4 grey--lighter">
          <div className="container">
            <h3 className="pb-3">Psicoativos</h3>
            <ListDrugs limit={6} />
          </div>
        </section>
        {/** <section className="section grey--lighter">
          <div className="container">
            <h3 className="pb-3">Redução de danos</h3>
            <ListArticles perPage={6} categories={[35]} />
          </div>
        </section>
        <section className="section grey--lighter">
          <div className="container">
            <h3 className="pb-3">DIY</h3>
            <ListArticles perPage={6} categories={[167]} />
          </div>
        </section>**/}
      </div>
    )
  }
}

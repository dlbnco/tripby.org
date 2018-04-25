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
// import Button from '../../components/Button'
import ListDrugs from '../../components/ListDrugs'

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FeaturedContent tagline="Leia a bula.">
          <p className="lead">Esta é a versão em desenvolvimento do TRIPBY.</p>
          <p>Nos ajude a melhorar dando seu feedback no <a href="https://instagram.com/tripby_">Instagram</a>, <a href="https://twitter.com/tripby_">Twitter</a>, <a href="https://tripby.slack.com/join/shared_invite/enQtMzQwOTcyNTUyNjYzLTY5MjFiZjIyOWVkZDk2ZDQ2Zjc3MmE0N2FmNmE3NmFhMzA3MzY3MTFkNjJhZjgxMjYzOWZhNGQyNzg1YWM4ZTU">Slack</a> ou <a href="https://github.com/tripby/tripby.org">GitHub</a>.</p>
          {/* <Button campaign icon="trending_flat">Manifesto</Button> */}
        </FeaturedContent>
        <section className="py-4 grey--lighter">
          <div className="container">
            <h3 className="pb-3">Psicoativos em destaque</h3>
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

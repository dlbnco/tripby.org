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
import Markdown from 'react-markdown'

import messages from './messages'

import FeaturedContent from '../../components/FeaturedContent'
import ListDrugs from '../../components/ListDrugs'


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FeaturedContent tagline={messages.hero.title}>
          <Markdown source={messages.hero.content} />
        </FeaturedContent>
        <section className="py-4 grey--lighter">
          <div className="container">
            <h3 className="pb-3">{messages.featuredDrugs.defaultMessage}</h3>
            <ListDrugs
              limit={6} filter={{ molecules_some: {
                id_contains: '', // show only drugs that has molecule images
              } }}
            />
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

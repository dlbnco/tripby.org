import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Page from './components/Page';
import Drug from './components/Drug';
import Article from './components/Article';

require('./assets/styles/main.scss');

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/:page" component={Page} />
      <Route path="/psicoativos/:drug" component={Drug} />
      <Route path="/artigos/:article" component={Article} />
    </Route>
  </Router>
), document.getElementById('app'))

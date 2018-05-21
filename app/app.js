/**
* app.js
*
* This is the entry file for the application, only setup and boilerplate
* code.
*/

// Needed for redux-saga es6 generator support
import 'babel-polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { useScroll } from 'react-router-scroll'
import ReactGA from 'react-ga'

// Import Apollo stuff
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

// Import root app
import App from 'containers/App'

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors'

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider'

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import 'file-loader?name=[name].[ext]!./.htaccess'
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store'

// Import i18n messages
import { translationMessages } from './i18n'

// Import SCSS and Bootstrap v4
import './assets/styles/main.scss'

// Import root routes
import createRoutes from './routes'

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {}
const store = configureStore(initialState, browserHistory)

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
})

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
}

// Setup Apollo
const httpLink = createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/tripby',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


ReactGA.initialize('UA-61977009-2')

const track = () => {
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ApolloProvider client={client}>
          <Router
            history={history}
            onUpdate={track}
            routes={rootRoute}
            render={
              // Scroll to top when going to a new page, imitating default browser
              // behaviour
              applyRouterMiddleware(
                useScroll((prevRouterProps, { routes }) => {
                  if (prevRouterProps) {
                    return routes[1].path !== '/drugs/:drug/:tab'
                  }
                  return true
                })
              )
            }
          />
        </ApolloProvider>
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  )
}

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'))
  }))
  .then(() => Promise.all([
    import('intl/locale-data/jsonp/en.js'),
  ]))
  .then(() => render(translationMessages))
  .catch((err) => {
    throw err
  })
} else {
  render(translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install() // eslint-disable-line global-require
}

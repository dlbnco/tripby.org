// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors'

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err) // eslint-disable-line no-console
}

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store) // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage'),
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([component]) => {
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      },
    }, {
      path: '/drugs/:drug/:tab',
      name: 'drugPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/DrugPage/reducer'),
          import('containers/DrugPage'),
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, component]) => {
          injectReducer('drugPage', reducer.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      },
    }, {
      path: '/articles/:article',
      name: 'articlePage',
      getComponent(location, cb) {
        import('containers/ArticlePage')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    }, {
      path: '/drugs',
      name: 'allDrugs',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/AllDrugs/reducer'),
          import('containers/AllDrugs'),
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, component]) => {
          injectReducer('allDrugs', reducer.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      },
    }, {
      path: '/authorize',
      name: 'homePage',
      getComponent(location, cb) {
        import('containers/HomePage')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    }, {
      path: '/search',
      name: 'search',
      getComponent(location, cb) {
        import('components/Search')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    }, {
      path: '/experiences/create',
      name: 'createExperience',
      getComponent(location, cb) {
        import('containers/CreateExperience')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    }, {
      path: '/:type/:operation/success',
      name: 'contributionSuccess',
      getComponent(location, cb) {
        import('components/ContributionSuccess')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    }, {
      path: '/experiences/:id',
      name: 'experiencePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ExperiencePage/reducer'),
          import('containers/ExperiencePage'),
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, component]) => {
          injectReducer('experiencePage', reducer.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading)
      },
    },
  ]
}

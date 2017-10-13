import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import appRootReducer from './reducers'
import { reducer as formReducer } from 'redux-form'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import { ApolloProvider } from 'react-apollo'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './styles/css/index.css'
import Raven from 'raven-js' // for Sentry error logging
import ReactGA from 'react-ga'

// create websocket client for subscriptions:
const wsClient = new SubscriptionClient(
  process.env.REACT_APP_GRAPHCOOL_WSS_ENDPOINT, { reconnect: true }
)
const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHCOOL_ENDPOINT
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

// use the auth0IdToken in localStorage for authorized requests:
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    // get the authentication token from local storage if it exists:
    if (localStorage.getItem('id_token')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('id_token')}`
    }
    next()
  },
}])

const client = new ApolloClient(
  { networkInterface: networkInterfaceWithSubscriptions
  })

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    //form reducer must be at the root **
    form: formReducer,
    //application reducer, separate from apollo:
    app: appRootReducer
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware(), reduxThunk),
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)

injectTapEventPlugin() //for material-ui onclick events
Raven.config(process.env.REACT_APP_SENTRY_URL).install()

if (process.env.REACT_APP_ENV === 'production') {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
}

ReactDOM.render((
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>
),
  document.getElementById('root')
)

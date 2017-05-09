import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import injectTapEventPlugin from 'react-tap-event-plugin';

const client = new ApolloClient({
  networkInterface: createNetworkInterface(
    { uri: 'https://api.graph.cool/simple/v1/cj2hsn8pvak4o0187k52n2i3l'}
  ),
})

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer,
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)

injectTapEventPlugin() //for material-ui onclick events

ReactDOM.render((
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>
),
  document.getElementById('root')
)

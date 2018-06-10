import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import App from './App'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)

export default hot(module)(Root)

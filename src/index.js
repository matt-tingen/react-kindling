import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import store, { history } from './store'
import Root from './views/Root'

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
)
registerServiceWorker()

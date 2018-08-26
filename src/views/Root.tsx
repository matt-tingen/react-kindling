import * as React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'unstated'
import App from './App'

const Root: React.SFC = () => (
  <Provider>
    <Router>
      <App />
    </Router>
  </Provider>
)

export default hot(module)(Root)

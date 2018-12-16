import * as React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from '../hooks/useUser'
import App from './App'

const Root: React.SFC = () => (
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
)

export default hot(module)(Root)

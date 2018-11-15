import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from 'src/hooks/user'
import App from './App'

const Root: React.SFC = () => (
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
)

export default Root

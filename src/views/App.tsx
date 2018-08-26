import { css } from 'emotion'
import * as React from 'react'
import Header from './Header'
import NavBar from './NavBar'
import Router from './Router'

const classes = {
  container: css`
    text-align: center;
  `,
}

const App: React.SFC = () => (
  <div className={classes.container}>
    <Header>React Kindling</Header>
    <NavBar />
    <Router />
  </div>
)

export default App

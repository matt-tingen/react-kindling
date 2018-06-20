import { css } from 'emotion'
import React, { Component } from 'react'
import Header from './Header'
import NavBar from './NavBar'
import Router from './Router'

const classes = {
  container: css`
    text-align: center;
  `,
}

class App extends Component {
  render() {
    return (
      <div className={classes.container}>
        <Header>React Kindling</Header>
        <NavBar />
        <Router />
      </div>
    )
  }
}

export default App

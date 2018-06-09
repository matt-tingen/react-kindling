import { css } from 'emotion'
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddItem from './AddItem'
import Header from './Header'
import Items from './Items'
import NavBar from './NavBar'

const classes = {
  container: css`
    text-align: center;
  `,
  intro: css`
    font-size: large;
  `,
}

class App extends Component {
  render() {
    return (
      <div className={classes.container}>
        <Header>Welcome to React</Header>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Items} />
          <Route path="/add" component={AddItem} />
        </Switch>
      </div>
    )
  }
}

export default App

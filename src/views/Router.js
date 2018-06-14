import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AddItem from './AddItem'
import Items from './Items'

const Router = () => (
  <Switch>
    <Route exact path="/" component={Items} />
    <Route path="/add" component={AddItem} />
  </Switch>
)

export default Router

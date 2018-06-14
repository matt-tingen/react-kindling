import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AddItem from './AddItem'
import Auth from './Auth'
import Items from './Items'

const Router = () => (
  <Switch>
    <Route exact path="/" component={Items} />
    <Route path="/add" component={AddItem} />
    <Route path="/auth" component={Auth} />
  </Switch>
)

export default Router

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import authOnly from '../hocs/authOnly'
import AddItem from './AddItem'
import Auth from './Auth'
import Items from './Items'

const Router = () => (
  <Switch>
    <Route exact path="/" component={authOnly(Items)} />
    <Route path="/add" component={authOnly(AddItem)} />
    <Route path="/auth" component={Auth} />
  </Switch>
)

export default Router

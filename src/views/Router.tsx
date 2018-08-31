import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import AddItem from './AddItem'
import Auth from './Auth'
import Items from './Items'
import PrivateRoute from './PrivateRouter'

const Router: React.SFC = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Items} />
    <PrivateRoute path="/add" component={AddItem} />
    <Route path="/auth" component={Auth} />
  </Switch>
)

export default Router

import * as React from 'react'
import { Subscribe } from 'unstated'
import UserContainer from '../store/UserContainer'
import getDisplayName from './helpers/getDisplayName'

const withUser = WrappedComponent => {
  const WithUser = props => (
    <Subscribe to={[UserContainer]}>
      {user => <WrappedComponent {...props} user={user.state.user} />}
    </Subscribe>
  )
  WithUser.displayName = `withUser(${getDisplayName(WrappedComponent)})`
  return WithUser
}

export default withUser

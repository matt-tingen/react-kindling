import * as React from 'react'
import { Subscribe } from 'unstated'
import UserContainer from '../store/UserContainer'
import getDisplayName from './helpers/getDisplayName'

const withUser = <Props extends {}>(
  WrappedComponent: React.ComponentType<Props & { user?: firebase.User }>,
) => {
  const WithUser: React.SFC<Props> = props => (
    <Subscribe to={[UserContainer]}>
      {(user: UserContainer) => (
        <WrappedComponent {...props} user={user.state.user} />
      )}
    </Subscribe>
  )
  WithUser.displayName = `withUser(${getDisplayName(WrappedComponent)})`
  return WithUser
}

export default withUser

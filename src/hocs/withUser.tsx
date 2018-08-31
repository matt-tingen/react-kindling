import * as React from 'react'
import { Subscribe } from 'unstated'
import UserContainer from '../store/UserContainer'
import getDisplayName from './helpers/getDisplayName'

export interface UserProps {
  user?: firebase.User
}

const withUser = <Props extends {}>(
  WrappedComponent: React.ComponentType<Props & UserProps>,
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

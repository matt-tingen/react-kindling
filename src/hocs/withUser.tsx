import * as React from 'react'
import { useUser } from 'src/hooks/user'
import getDisplayName from './helpers/getDisplayName'

export interface UserProps {
  user?: firebase.User
}

const withUser = <Props extends {}>(
  WrappedComponent: React.ComponentType<Props & UserProps>,
) => {
  const WithUser: React.SFC<Props> = props => {
    const { user } = useUser()
    return <WrappedComponent {...props} user={user} />
  }
  WithUser.displayName = `withUser(${getDisplayName(WrappedComponent)})`
  return WithUser
}

export default withUser

import * as React from 'react'
import firebase, { providers } from '../firebase'
import useListener from './useListener'

interface ContextValue {
  loading: boolean
  error?: any
  user?: firebase.User
  login(): void
  logout(): void
}

const auth = firebase.auth()
const noop = () => {}

const UserContext = React.createContext<ContextValue>({
  loading: false,
  error: new Error('No user provider'),
  login: noop,
  logout: noop,
})

const useUser = () => React.useContext(UserContext)

export const UserProvider: React.SFC = ({ children }) => {
  const [user, { loading, error, wrapUpdater }] = useListener(
    auth.onAuthStateChanged.bind(auth),
    [],
  )

  const value = {
    user,
    loading,
    error,
    login: wrapUpdater(() => auth.signInWithPopup(providers.google)),
    logout: wrapUpdater(() => auth.signOut()),
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default useUser

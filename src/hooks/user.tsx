import * as React from 'react'
import firebase, { providers } from '../firebase'

interface State {
  loading: boolean
  error: Error | null
  user: firebase.User | null
}

interface ContextValue extends State {
  login(): void
  logout(): void
}

const auth = firebase.auth()
const noop = () => {}

const initialState: State = {
  loading: false,
  error: null,
  user: null,
}

const UserContext = React.createContext<ContextValue>({
  ...initialState,
  error: new Error('No user provider'),
  login: noop,
  logout: noop,
})

export const useUser = () => React.useContext(UserContext)

export const UserProvider: React.SFC = ({ children }) => {
  const [state, setState] = React.useState<State>(initialState)
  React.useEffect(
    () =>
      auth.onAuthStateChanged(user => {
        if (user) {
          setState({ loading: false, error: null, user })
        } else {
          setState({ loading: false, error: null, user: null })
        }
      }),
    [],
  )

  const startLoading = () => {
    setState({ loading: true, error: null, user: null })
  }

  const value = {
    ...state,
    async login() {
      startLoading()

      try {
        await auth.signInWithPopup(providers.google)
        // setUser is dispatched by listeners
      } catch (error) {
        setState({ loading: false, error, user: null })
      }
    },
    async logout() {
      startLoading()

      try {
        await auth.signOut()
        // clear is dispatched by listeners
      } catch (error) {
        setState({ loading: false, error, user: null })
      }
    },
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

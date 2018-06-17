import firebase, { providers } from '../../firebase'

const auth = firebase.auth()

const user = {
  state: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    startLoading(state) {
      return {
        ...state,
        loading: true,
        error: null,
      }
    },
    setError(state, error) {
      return {
        ...state,
        loading: false,
        error,
      }
    },
    setUser(state, user) {
      return {
        ...state,
        loading: false,
        error: null,
        user,
      }
    },
    clearUser(state) {
      return {
        ...state,
        loading: false,
        error: null,
        user: null,
      }
    },
  },
  effects: {
    async login() {
      this.startLoading()

      try {
        await auth.signInWithPopup(providers.google)
        // setUser is dispatched by listeners
      } catch (error) {
        this.setError(error.message)
      }
    },
    async logout() {
      this.startLoading()

      try {
        await auth.signOut()
        // clearUser is dispatched by listeners
      } catch (error) {
        this.setError(error.message)
      }
    },
  },
}

export default user

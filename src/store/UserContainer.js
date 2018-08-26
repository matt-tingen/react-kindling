import { Container } from 'unstated'
import firebase, { providers } from '../firebase'

const auth = firebase.auth()

class UserContainer extends Container {
  state = {
    loading: false,
    error: null,
    user: null,
  }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)

    this.addListeners()
  }

  addListeners() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setUser(user)
      } else {
        this.clear()
      }
    })
  }

  startLoading() {
    return this.setState({ loading: true, error: null, user: null })
  }

  setError(error) {
    return this.setState({ loading: false, error, user: null })
  }

  setUser(user) {
    return this.setState({ loading: false, error: null, user })
  }

  clear() {
    return this.setState({ loading: false, error: null, user: null })
  }

  async login() {
    await this.startLoading()

    try {
      await auth.signInWithPopup(providers.google)
      // setUser is dispatched by listeners
    } catch (error) {
      await this.setError(error.message)
    }
  }

  async logout() {
    await this.startLoading()

    try {
      await auth.signOut()
      // clear is dispatched by listeners
    } catch (error) {
      await this.setError(error.message)
    }
  }
}

export default UserContainer

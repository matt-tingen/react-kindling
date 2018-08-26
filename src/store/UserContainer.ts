import { Container } from 'unstated'
import firebase, { providers } from '../firebase'

interface State {
  loading: boolean
  error: Error | null
  user: firebase.User | null
}

const auth = firebase.auth()

class UserContainer extends Container<State> {
  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)

    this.state = {
      loading: false,
      error: null,
      user: null,
    }

    this.addListeners()
  }

  private addListeners() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setUser(user)
      } else {
        this.clear()
      }
    })
  }

  private startLoading() {
    return this.setState({ loading: true, error: null, user: null })
  }

  private setError(error: Error) {
    return this.setState({ loading: false, error, user: null })
  }

  private setUser(user: firebase.User) {
    return this.setState({ loading: false, error: null, user })
  }

  private clear() {
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

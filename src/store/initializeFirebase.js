import { dispatch } from '@rematch/core'
import app from '../firebase'

const initializeFirebase = () => {
  app.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch.user.setUser(user)
    } else {
      dispatch.user.clearUser()
    }
  })
}

export default initializeFirebase

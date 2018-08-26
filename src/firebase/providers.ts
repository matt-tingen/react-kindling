import * as firebase from 'firebase/app'

const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
}

export default providers

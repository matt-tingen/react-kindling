import firebase from 'firebase/app'
import 'firebase/firestore'

const init = (projectId, config) => {
  const app = firebase.initializeApp({
    projectId,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    storageBucket: `${projectId}.appspot.com`,
    ...config,
  })

  const firestore = app.firestore()
  firestore.settings({ timestampsInSnapshots: true })

  return app
}

export default init

import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { firestoreReducer, reduxFirestore } from 'redux-firestore'
import { reducer as formReducer } from 'redux-form'
import firebase from './firebase'

const reactReduxConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

const createStoreWithFirebase = composeWithDevTools(
  reactReduxFirebase(firebase, reactReduxConfig),
  reduxFirestore(firebase),
)(createStore)

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: formReducer,
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

export default store

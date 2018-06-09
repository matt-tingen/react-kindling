import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { firestoreReducer, reduxFirestore } from 'redux-firestore'
import { reducer as formReducer } from 'redux-form'
import firebase from './firebase'

export const history = createBrowserHistory()

const reactReduxConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

const enhancedCreateStore = composeWithDevTools(
  reactReduxFirebase(firebase, reactReduxConfig),
  reduxFirestore(firebase),
)(createStore)

const enhanceReducers = compose(connectRouter(history))
const rootReducer = enhanceReducers(
  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form: formReducer,
  }),
)

const initialState = {}

const middleware = compose(applyMiddleware(routerMiddleware(history)))

const store = enhancedCreateStore(rootReducer, initialState, middleware)

export default store

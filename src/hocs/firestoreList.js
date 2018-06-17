import { branch, compose, renderComponent, withHandlers } from 'recompose'
import firebase from '../firebase'
import firebaseListener from '../hocs/firebaseListener'

const db = firebase.firestore()

const firestoreList = (collection, query, options) => {
  return compose(
    firebaseListener(collection, query),
    withHandlers({
      deleteDoc: () => doc =>
        db
          .collection(collection)
          .doc(doc)
          .delete(),
    }),
    branch(
      props => !props[collection],
      renderComponent(options.loading),
      branch(
        props => !props[collection].length,
        renderComponent(options.empty),
      ),
    ),
  )
}
export default firestoreList

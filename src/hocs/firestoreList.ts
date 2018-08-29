import { ComponentType, ReactHTML } from 'react'
import { branch, compose, renderComponent, withHandlers } from 'recompose'
import firebase from '../firebase'
import firebaseListener from '../hocs/firebaseListener'
import { MaybeFunction } from '../utils/asFunction'
import { QueryRequest } from '../utils/buildQuery'

const db = firebase.firestore()

type ComponentLike = ComponentType | (keyof ReactHTML)

interface FirestoreListOptions {
  loading: ComponentLike
  empty: ComponentLike
}

const firestoreList = <Props>(
  collection: string,
  query: MaybeFunction<QueryRequest, [Props]>,
  options: FirestoreListOptions,
) => {
  return compose(
    firebaseListener(collection, query),
    withHandlers({
      deleteDoc: () => (doc: string) =>
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

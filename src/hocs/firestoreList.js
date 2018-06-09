import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { branch, renderComponent, withHandlers } from 'recompose'
import { compose } from 'redux'

const collectionName = query =>
  typeof query === 'string' ? query : query.collection

const firestoreList = (query, options) => {
  const collection = collectionName(query)

  return compose(
    firestoreConnect([query]),
    connect(state => ({
      docs: state.firestore.ordered[collection],
    })),
    withHandlers({
      deleteDoc: ({ firestore }) => doc =>
        firestore.delete({ collection, doc }),
    }),
    branch(
      ({ docs }) => !isLoaded(docs),
      renderComponent(options.loading),
      branch(({ docs }) => isEmpty(docs), renderComponent(options.empty)),
    ),
  )
}
export default firestoreList

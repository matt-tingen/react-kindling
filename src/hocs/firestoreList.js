import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withHandlers } from 'recompose'
import { compose } from 'redux'

const collectionName = query =>
  typeof query === 'string' ? query : query.collection

const firestoreList = query => {
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
  )
}
export default firestoreList

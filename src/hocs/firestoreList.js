import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { withHandlers } from 'recompose'
import { compose } from 'redux'

const firestoreList = collection =>
  compose(
    firestoreConnect([collection]),
    connect(state => ({
      docs: state.firestore.data[collection],
    })),
    withHandlers({
      deleteItem: ({ firestore }) => doc =>
        firestore.delete({ collection, doc }),
    }),
  )

export default firestoreList

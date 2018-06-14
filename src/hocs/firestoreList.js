import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { branch, renderComponent, withHandlers } from 'recompose'
import { compose } from 'redux'

const asArray = fn => (...args) => [fn(...args)]
const asCallable = value => (typeof value === 'function' ? value : () => value)

const firestoreList = (collection, fnOrQuery, options) => {
  const queryArg = asArray(asCallable(fnOrQuery))

  return compose(
    firestoreConnect(queryArg),
    connect(state => ({
      [collection]: state.firestore.ordered[collection],
    })),
    withHandlers({
      deleteDoc: ({ firestore }) => doc =>
        firestore.delete({ collection, doc }),
    }),
    branch(
      props => !isLoaded(props[collection]),
      renderComponent(options.loading),
      branch(
        props => isEmpty(props[collection]),
        renderComponent(options.empty),
      ),
    ),
  )
}
export default firestoreList

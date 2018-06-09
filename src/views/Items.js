import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { withHandlers } from 'recompose'
import { compose } from 'redux'
import MiniDeleteButton from './MiniDeleteButton'

const Items = ({ items, deleteItem }) => {
  const itemsList = !isLoaded(items)
    ? 'Loading'
    : isEmpty(items)
      ? 'Item list is empty'
      : Object.keys(items).map(
          id =>
            items[id] && (
              <li key={id}>
                {items[id].name}
                <MiniDeleteButton onClick={() => deleteItem(id)} />
              </li>
            ),
        )
  return (
    <div>
      <h1>Items</h1>
      <ul>{itemsList}</ul>
    </div>
  )
}

const collection = 'items'

export default compose(
  firestoreConnect([collection]),
  connect(state => ({
    items: state.firestore.data.items,
  })),
  withHandlers({
    deleteItem: ({ firestore }) => doc => firestore.delete({ collection, doc }),
  }),
)(Items)

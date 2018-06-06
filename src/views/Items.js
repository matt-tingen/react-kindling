import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'

const Items = ({ items }) => {
  const itemsList = !isLoaded(items)
    ? 'Loading'
    : isEmpty(items)
      ? 'Item list is empty'
      : Object.keys(items).map((key, id) => (
          <li key={key}>{items[key].name}</li>
        ))
  return (
    <div>
      <h1>Items</h1>
      <ul>{itemsList}</ul>
    </div>
  )
}

export default compose(
  firestoreConnect(['items']),
  connect(state => ({
    items: state.firestore.data.items,
  })),
)(Items)

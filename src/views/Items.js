import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { withHandlers, withProps } from 'recompose'
import { compose } from 'redux'

const MiniDeleteButton = withProps({
  type: 'button',
  children: 'X',
})(styled.button`
  margin: 10px;
  color: red;
  font-weight: bold;
`)

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

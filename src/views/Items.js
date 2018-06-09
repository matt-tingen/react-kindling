import React from 'react'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import firestoreList from '../hocs/firestoreList'
import MiniDeleteButton from './MiniDeleteButton'

const Items = ({ docs, deleteItem }) => {
  const itemsList = !isLoaded(docs)
    ? 'Loading'
    : isEmpty(docs)
      ? 'Item list is empty'
      : Object.keys(docs).map(
          id =>
            docs[id] && (
              <li key={id}>
                {docs[id].name}
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

export default firestoreList('items')(Items)

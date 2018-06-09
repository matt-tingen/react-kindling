import React from 'react'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import firestoreList from '../hocs/firestoreList'
import MiniDeleteButton from './MiniDeleteButton'

const Items = ({ docs, deleteDoc }) => {
  const itemsList = !isLoaded(docs) ? (
    'Loading'
  ) : isEmpty(docs) ? (
    'Item list is empty'
  ) : (
    <ul>
      {Object.keys(docs).map(
        id =>
          docs[id] && (
            <li key={id}>
              {docs[id].name}
              <MiniDeleteButton onClick={() => deleteDoc(id)} />
            </li>
          ),
      )}
    </ul>
  )
  return (
    <div>
      <h1>Items</h1>
      {itemsList}
    </div>
  )
}

export default firestoreList({
  collection: 'items',
  orderBy: [['name', 'asc']],
})(Items)

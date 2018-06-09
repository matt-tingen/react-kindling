import React from 'react'
import firestoreList from '../hocs/firestoreList'
import Loading from './Loading'
import MiniDeleteButton from './MiniDeleteButton'

const ItemsList = ({ docs, deleteDoc }) => (
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

export default firestoreList(
  {
    collection: 'items',
    orderBy: [['name', 'asc']],
  },
  { loading: Loading, empty: () => 'Item list is empty' },
)(ItemsList)

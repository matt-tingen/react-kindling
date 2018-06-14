import React from 'react'
import { compose } from 'recompose'
import firestoreList from '../hocs/firestoreList'
import withAuth from '../hocs/withAuth'
import Loading from './Loading'
import MiniDeleteButton from './MiniDeleteButton'

const ItemsList = ({ items, deleteDoc }) => (
  <ul>
    {Object.keys(items).map(
      id =>
        items[id] && (
          <li key={id}>
            {items[id].name}
            <MiniDeleteButton onClick={() => deleteDoc(id)} />
          </li>
        ),
    )}
  </ul>
)

export default compose(
  withAuth,
  firestoreList(
    'items',
    ({ auth }) => ({
      collection: 'items',
      where: ['userId', '==', auth.uid || null],
      orderBy: ['name'],
    }),

    { loading: Loading, empty: () => 'Item list is empty' },
  ),
)(ItemsList)

import React from 'react'
import { compose } from 'recompose'
import firestoreList from '../hocs/firestoreList'
import withUser from '../hocs/withUser'
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
  withUser,
  firestoreList(
    'items',
    // (collection, { user }) =>
    //   collection
    //   .where('userId', '==', user ? user.uid : null)
    //   .orderBy('name'),

    ({ user }) => ({
      where: ['userId', '==', user ? user.uid : null],
      orderBy: ['name'],
    }),
    { loading: Loading, empty: () => 'Item list is empty' },
  ),
)(ItemsList)

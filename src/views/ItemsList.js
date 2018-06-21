import React from 'react'
import { compose } from 'recompose'
import firestoreList from '../hocs/firestoreList'
import withUser from '../hocs/withUser'
import Loading from './Loading'
import MiniDeleteButton from './MiniDeleteButton'

const ItemsList = ({ items, deleteDoc }) => (
  <ul>
    {items.map(
      ([id, item]) =>
        item && (
          <li key={id}>
            {item.name}
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
    ({ user }) => ({
      where: ['userId', '==', user ? user.uid : null],
      orderBy: ['name'],
    }),
    { loading: Loading, empty: () => 'Item list is empty' },
  ),
)(ItemsList)

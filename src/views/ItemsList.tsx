import * as React from 'react'
import { compose } from 'recompose'
import firestoreList from '../hocs/firestoreList'
import withUser, { UserProps } from '../hocs/withUser'
import Item from '../types/Item'
import Loading from './Loading'
import MiniDeleteButton from './MiniDeleteButton'

const Empty: React.SFC = () => <div>Item list is empty</div>

interface Props {
  deleteDoc: (doc: string) => Promise<void>
  items: [string, Item][]
}

const ItemsList: React.SFC<Props> = ({ items, deleteDoc }) => (
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
  firestoreList<UserProps>(
    'items',
    ({ user }) => ({
      where: ['userId', '==', user ? user.uid : null],
      orderBy: ['name'],
    }),
    { loading: Loading, empty: Empty },
  ),
)(ItemsList)

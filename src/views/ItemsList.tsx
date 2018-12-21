import * as React from 'react'
import useFirebaseList from '../hooks/useFirebaseList'
import useUser from '../hooks/useUser'
import { remove } from '../utils/collection'
import Loading from './Loading'
import MiniDeleteButton from './MiniDeleteButton'

const ItemsList: React.SFC = () => {
  const { user } = useUser()
  const items = useFirebaseList(
    'items',
    {
      where: ['userId', '==', user ? user.uid : null],
      orderBy: ['name'],
    },
    [user],
  )

  if (!items) {
    return <Loading />
  }

  if (!items.length) {
    return <p>Item list is empty</p>
  }

  return (
    <ul>
      {items.map(
        ([id, item]) =>
          item && (
            <li key={id}>
              {item.name}
              <MiniDeleteButton onClick={() => remove('items', id)} />
            </li>
          ),
      )}
    </ul>
  )
}

export default ItemsList

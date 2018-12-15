import * as React from 'react'
import useFirebaseCollection from 'src/hooks/useFirebaseCollection'
import { useUser } from 'src/hooks/user'
import Loading from './Loading'
import MiniDeleteButton from './MiniDeleteButton'

const ItemsList: React.SFC = () => {
  const { user } = useUser()
  const [items, { remove }] = useFirebaseCollection(
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
              <MiniDeleteButton onClick={() => remove(id)} />
            </li>
          ),
      )}
    </ul>
  )
}

export default ItemsList

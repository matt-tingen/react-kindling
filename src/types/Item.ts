export interface ProtoItem {
  userId: string | null
  name: string
}

interface Item extends ProtoItem {
  id: string
}

export default Item

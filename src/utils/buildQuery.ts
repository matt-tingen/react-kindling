import firebase from '../firebase'
import GetArgs from '../types/GetArgs'

const db = firebase.firestore()

type FirestoreQuery = firebase.firestore.Query
export type QueryRequest = Partial<
  Pick<
    { [K in keyof FirestoreQuery]: GetArgs<FirestoreQuery[K]> },
    | 'where'
    | 'orderBy'
    | 'limit'
    | 'startAt'
    | 'startAfter'
    | 'endBefore'
    | 'endAt'
  >
>

const buildQuery = (collection: string, query: QueryRequest) => {
  const options = Object.entries(query) as [keyof QueryRequest, any[]][]
  let result: FirestoreQuery = db.collection(collection)

  options.forEach(([method, args]) => {
    result = (result as any)[method](...args)
  })

  return result
}

export default buildQuery

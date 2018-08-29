import firebase from '../firebase'
import GetArgs from '../types/GetArgs'

const db = firebase.firestore()

type WhereArgs = GetArgs<FirestoreQuery['where']>
type OrderByArgs = GetArgs<FirestoreQuery['orderBy']>

export interface QueryRequest {
  where?: WhereArgs
  orderBy?: OrderByArgs
}

type FirestoreQuery = firebase.firestore.Query

const buildQuery = (collection: string, query: QueryRequest) => {
  const options = Object.entries(query)
  let result: FirestoreQuery = db.collection(collection)

  options.forEach(option => {
    result = applyOption(result, option)
  })

  return result
}

type OptionHandler = (query: FirestoreQuery, args: any[]) => FirestoreQuery

const optionHandlers: { [k in keyof QueryRequest]: OptionHandler } = {
  where: (query, args: WhereArgs) => query.where(...args),
  orderBy: (query, args: OrderByArgs) => query.orderBy(...args),
}

const applyOption = (query: FirestoreQuery, option: [string, any[]]) => {
  const [key, value] = option
  const handler = optionHandlers[key]
  return handler ? handler(query, value) : query
}

export default buildQuery

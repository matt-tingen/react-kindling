import firebase from '../firebase'

const db = firebase.firestore()

const buildQuery = (collection, query) => {
  const options = Object.entries(query)
  let result = db.collection(collection)

  options.forEach(option => {
    result = applyOption(result, option)
  })

  return result
}

const optionHandlers = {
  where: (query, args) => query.where(...args),
  orderBy: (query, args) => query.orderBy(...args),
}

const applyOption = (query, option) => {
  const [key, value] = option
  const handler = optionHandlers[key]
  return handler(query, value)
}

export default buildQuery

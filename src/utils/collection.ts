import firebase from '../firebase'

const db = firebase.firestore()

export const add = <T>(collection: string, data: T) =>
  db.collection(collection).add(data)

export const remove = (collection: string, id: string) =>
  db
    .collection(collection)
    .doc(id)
    .delete()

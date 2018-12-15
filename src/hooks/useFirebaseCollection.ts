import { InputIdentityList, useEffect, useState } from 'react'
import firebase from '../firebase'
import buildQuery, { QueryRequest } from '../utils/buildQuery'

const db = firebase.firestore()

type DocumentPair<T> = [string, T]

type NullableData<T> = DocumentPair<T>[] | null

interface CollectionOperations<T> {
  add(data: T): Promise<firebase.firestore.DocumentReference>
  remove(id: string): Promise<void>
}

const useFirebaseCollection = <T = firebase.firestore.DocumentData>(
  collection: string,
  query: QueryRequest,
  inputs: InputIdentityList,
): [NullableData<T>, CollectionOperations<T>] => {
  const [docs, setDocs] = useState<NullableData<T>>(null)
  useEffect(
    () =>
      buildQuery(collection, query).onSnapshot(snapshot => {
        const docs: DocumentPair<T>[] = []
        // snapshot does not support `.map()`
        snapshot.forEach(doc => {
          docs.push([doc.id, doc.data() as T])
        })
        setDocs(docs)
      }),
    inputs,
  )
  return [
    docs,
    {
      add: (data: T) => db.collection(collection).add(data),
      remove: (id: string) =>
        db
          .collection(collection)
          .doc(id)
          .delete(),
    },
  ]
}

export default useFirebaseCollection

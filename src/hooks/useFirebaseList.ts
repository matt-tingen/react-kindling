import { InputIdentityList, useEffect, useState } from 'react'
import buildQuery, { QueryRequest } from '../utils/buildQuery'

type DocumentPair<T> = [string, T]

type NullableData<T> = DocumentPair<T>[] | null

const useFirebaseList = <T = firebase.firestore.DocumentData>(
  collection: string,
  query: QueryRequest,
  inputs: InputIdentityList,
): NullableData<T> => {
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
  return docs
}

export default useFirebaseList

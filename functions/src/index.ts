import * as functions from 'firebase-functions'
import * as _ from 'lodash'

const wasModified = (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>
) => {
  const data = change.after.data()
  const previousData = change.before.data()

  if (!data || !previousData) {
    return false
  }

  delete data.createdAt
  delete data.modifiedAt

  delete previousData.createdAt
  delete previousData.modifiedAt

  return !_.isEqual(data, previousData)
}

export const anyCreate = functions.firestore
  .document('{collection}/{docId}')
  .onCreate(snap => {
    const date = snap.createTime!.toDate()
    return snap.ref.set(
      {
        createdAt: date,
        modifiedAt: date,
      },
      { merge: true }
    )
  })

export const anyUpdate = functions.firestore
  .document('{collection}/{docId}')
  .onUpdate(change => {
    // Avoid updating if only modifiedAt changed to prevent an infinite loop.
    if (!wasModified(change)) {
      return null
    }

    return change.after.ref.set(
      { modifiedAt: change.after.updateTime!.toDate() },
      { merge: true }
    )
  })

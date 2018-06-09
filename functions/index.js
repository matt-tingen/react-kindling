const functions = require('firebase-functions')
const _ = require('lodash')

const wasModified = change => {
  const data = change.after.data()
  delete data.createdAt
  delete data.modifiedAt

  const previousData = change.before.data()
  delete previousData.createdAt
  delete previousData.modifiedAt

  return !_.isEqual(data, previousData)
}

exports.anyCreate = functions.firestore
  .document('{collection}/{docId}')
  .onCreate((snap, context) => {
    const date = new Date(snap.createTime)
    snap.ref.set({ createdAt: date, modifiedAt: date }, { merge: true })
  })

exports.anyUpdate = functions.firestore
  .document('{collection}/{docId}')
  .onUpdate((change, context) => {
    // Avoid updating if only modifiedAt changed to prevent an infinite loop.
    if (!wasModified(change)) {
      return null
    }

    return change.after.ref.set(
      { modifiedAt: new Date(change.after.updateTime) },
      { merge: true }
    )
  })

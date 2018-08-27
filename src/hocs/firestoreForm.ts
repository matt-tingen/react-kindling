import { withFormik } from 'formik'
import firebase from '../firebase'

interface FirestoreFormOptions {
  transform: (values: object, props: object) => object
  formik: object
}

const firestoreForm = (
  collection: string,
  { transform, formik }: FirestoreFormOptions = {
    transform: values => values,
    formik: {},
  },
) =>
  withFormik({
    ...formik,
    handleSubmit: (values, { props }) => {
      const db = firebase.firestore()
      db.collection(collection).add(transform(values, props))
    },
  })

export default firestoreForm

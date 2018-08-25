import { withFormik } from 'formik'
import firebase from '../firebase'

const firestoreForm = (
  { collection, transform, formik } = {
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

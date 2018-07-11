import { compose } from 'recompose'
import { reduxForm } from 'redux-form'
import firebase from '../firebase'

const firestoreForm = (
  { collection, reduxForm: reduxFormOptions, transform } = {
    reduxForm: {},
    transform: values => values,
  },
) =>
  compose(
    reduxForm({
      ...reduxFormOptions,
      onSubmit: (values, dispatch, props) => {
        const db = firebase.firestore()
        db.collection(collection).add(transform(values, props))
      },
    }),
  )

export default firestoreForm

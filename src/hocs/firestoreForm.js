import { withFirestore } from 'react-redux-firebase'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form'

const firestoreForm = (
  collection,
  reduxFormOptions,
  transform = values => values,
) =>
  compose(
    withFirestore,
    reduxForm({
      ...reduxFormOptions,
      onSubmit: (values, dispatch, props) => {
        props.firestore.add({ collection }, transform(values, props))
      },
    }),
  )

export default firestoreForm

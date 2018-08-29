import { FormikValues, withFormik, WithFormikConfig } from 'formik'
import firebase from '../firebase'
import asFunction from '../utils/asFunction'

interface FirestoreFormOptions<Props, Values extends FormikValues, Payload> {
  initialValues: Values | ((props: Props) => Values)
  transform?: (values: Values, props: Props) => Payload
  formik?: WithFormikConfig<Props, Values, Payload>
}

const firestoreForm = <Props, Values extends FormikValues, Payload = Values>(
  collection: string,
  {
    transform,
    initialValues,
    formik,
  }: FirestoreFormOptions<Props, Values, Payload>,
) =>
  withFormik({
    ...formik,
    mapPropsToValues: asFunction(initialValues),
    handleSubmit: (valuesArg, { props, resetForm }) => {
      const values =
        typeof valuesArg === 'function' ? valuesArg(props) : valuesArg
      const payload = transform ? transform(values, props) : values
      const db = firebase.firestore()
      db.collection(collection).add(payload)
      resetForm()
    },
  })

export default firestoreForm

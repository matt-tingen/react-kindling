import { FormikValues, withFormik, WithFormikConfig } from 'formik'
import * as yup from 'yup'
import { Schema } from 'yup'
import firebase from '../firebase'
import Omit from '../types/Omit'
import asFunction from '../utils/asFunction'

type AllowedFormikOptions<Props, Values extends FormikValues, Payload> = Omit<
  WithFormikConfig<Props, Values, Payload>,
  'handleSubmit' | 'mapPropsToValues' | 'validationSchema' | 'validate'
>
interface EnhancedFormikOptions<Props, Values extends FormikValues, Payload>
  extends AllowedFormikOptions<Props, Values, Payload> {
  validationSchema?: Schema<Values> | ((props: Props) => Schema<Values>)
}

type SchemaShape<T> = { [field in keyof T]: Schema<T[field]> }

interface FirestoreFormOptions<Props, Values extends FormikValues, Payload> {
  initialValues: Values | ((props: Props) => Values)
  transform?: (values: Values, props: Props) => Payload
  schema?: SchemaShape<Values> | ((props: Props) => SchemaShape<Values>)
  formik?: EnhancedFormikOptions<Props, Values, Payload>
}

const firestoreForm = <Props, Values extends FormikValues, Payload = Values>(
  collection: string,
  {
    transform,
    initialValues,
    schema,
    formik,
  }: FirestoreFormOptions<Props, Values, Payload>,
) =>
  withFormik({
    ...formik,
    validationSchema:
      schema &&
      ((props: Props) => yup.object<Values>().shape(asFunction(schema)(props))),
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

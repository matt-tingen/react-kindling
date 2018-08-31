import {
  ComponentDecorator,
  FormikValues,
  InjectedFormikProps,
  withFormik,
  WithFormikConfig,
} from 'formik'
import { compose, mapProps } from 'recompose'
import * as yup from 'yup'
import { Schema } from 'yup'
import firebase from '../../firebase'
import Omit from '../../types/Omit'
import asFunction, { MaybeFunction } from '../../utils/asFunction'
import withProps from '../withProps'
import FormField, { Props as FormFieldProps } from './FormField'

type AllowedFormikOptions<Props, Values extends FormikValues, Payload> = Omit<
  WithFormikConfig<Props, Values, Payload>,
  'handleSubmit' | 'mapPropsToValues' | 'validationSchema' | 'validate'
>
interface EnhancedFormikOptions<Props, Values extends FormikValues, Payload>
  extends AllowedFormikOptions<Props, Values, Payload> {
  validationSchema?:
    | Schema<Partial<Values>>
    | ((props: Props) => Schema<Partial<Values>>)
}

type SchemaShape<T> = { [field in keyof T]: Schema<T[field]> }

interface FirestoreFormOptions<Props, Values extends FormikValues, Payload> {
  initialValues: Values | ((props: Props) => Values)
  transform?: (values: Values, props: Props) => Payload
  schema?: MaybeFunction<SchemaShape<Partial<Values>>, [Props]>
  formik?: EnhancedFormikOptions<Props, Values, Payload>
}

type InnerFieldProps<Values> = Omit<FormFieldProps<Values>, 'formikBag'>

export type FirestoreFormProps<Values, Props = {}> = {
  Field: React.ComponentType<InnerFieldProps<Values>>
  formikBag: InjectedFormikProps<Props, Values>
}

const firestoreForm = <
  Values extends FormikValues,
  Props = {},
  Payload = Values
>(
  collection: string,
  {
    transform,
    initialValues,
    schema,
    formik,
  }: FirestoreFormOptions<Props, Values, Payload>,
): ComponentDecorator<{}, FirestoreFormProps<Values>> =>
  compose(
    withFormik({
      ...formik,
      validationSchema:
        schema &&
        ((props: Props) =>
          yup.object<Partial<Values>>().shape(asFunction(schema)(props))),
      mapPropsToValues: asFunction(initialValues),
      handleSubmit: (valuesArg, { props, resetForm }) => {
        const values =
          typeof valuesArg === 'function' ? valuesArg(props) : valuesArg
        const payload = transform ? transform(values, props) : values
        const db = firebase.firestore()
        db.collection(collection).add(payload)
        resetForm()
      },
    }),
    mapProps((props: InjectedFormikProps<Props, Values>) => ({
      formikBag: props,
      Field: withProps({ formikBag: props })(FormField),
    })),
  )
export default firestoreForm

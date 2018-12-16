import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import * as React from 'react'
import * as yup from 'yup'
import { Schema } from 'yup'
import firebase from '../firebase'
import Omit from '../types/Omit'
import SFCProps from '../types/SFCProps'

type AllowedFormikOptions<Values extends FormikValues> = Omit<
  FormikConfig<Values>,
  'onSubmit' | 'validationSchema' | 'validate'
>

type SchemaShape<T> = { [field in keyof T]: Schema<T[field]> }

interface Props<Values extends FormikValues, Payload> {
  collection: string
  initialValues: Values
  transform?: (values: Values) => Payload
  schema?: SchemaShape<Partial<Values>>
  formik?: AllowedFormikOptions<Values>
}

const FirestoreForm = <Values extends FormikValues, Payload = Values>({
  collection,
  transform,
  initialValues,
  schema,
  formik,
  children,
}: SFCProps<Props<Values, Payload>>) => {
  const formikProps: FormikConfig<Values> = {
    ...formik,
    validationSchema: schema && yup.object<Partial<Values>>().shape(schema),
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      const payload = transform ? transform(values) : values
      const db = firebase.firestore()
      await db.collection(collection).add(payload)
      resetForm()
    },
  }

  return (
    <Formik {...formikProps}>
      <Form>{children}</Form>
    </Formik>
  )
}

export default FirestoreForm

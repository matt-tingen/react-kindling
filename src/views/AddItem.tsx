import { InjectedFormikProps } from 'formik'
import * as React from 'react'
import { compose } from 'recompose'
import * as yup from 'yup'
import firestoreForm from '../hocs/firestoreForm'
import withUser from '../hocs/withUser'
import Item from '../types/Item'
import FormField from './FormField'

type Props = InjectedFormikProps<{}, Item>

const AddItem = ({ handleSubmit, isSubmitting, ...inputProps }: Props) => (
  <form onSubmit={handleSubmit}>
    <FormField name="name" type="text" {...inputProps} />
    <button type="submit" disabled={isSubmitting}>
      Add
    </button>
  </form>
)

export default compose(
  withUser,
  firestoreForm('items', {
    initialValues: { name: '' },
    transform: (values, { user }) => ({
      ...values,
      userId: user ? user.uid : null,
    }),
    schema: {
      name: yup.string().required(),
    },
  }),
)(AddItem)

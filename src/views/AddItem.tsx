import { InjectedFormikProps } from 'formik'
import * as React from 'react'
import { compose } from 'recompose'
import firestoreForm from '../hocs/firestoreForm'
import withUser from '../hocs/withUser'
import FormField from './FormField'

interface Values {
  name: string
}

type Props = InjectedFormikProps<{}, Values>

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
  }),
)(AddItem)

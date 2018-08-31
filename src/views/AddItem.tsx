import { InjectedFormikProps } from 'formik'
import * as React from 'react'
import { compose } from 'recompose'
import * as yup from 'yup'
import firestoreForm from '../hocs/firestoreForm'
import withUser, { UserProps } from '../hocs/withUser'
import { ProtoItem } from '../types/Item'
import FormField from './FormField'

type Props = InjectedFormikProps<{}, ProtoItem>

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
  firestoreForm<ProtoItem, UserProps>('items', {
    initialValues: ({ user }) => ({
      name: '',
      userId: user ? user.uid : null,
    }),
    schema: {
      name: yup.string().required(),
    },
  }),
)(AddItem)

import * as React from 'react'
import { compose } from 'recompose'
import * as yup from 'yup'
import firestoreForm, { FirestoreFormProps } from '../hocs/firestoreForm'
import withUser, { UserProps } from '../hocs/withUser'
import { ProtoItem } from '../types/Item'
import Form from './Form'
import FormField from './FormField'

type Props = FirestoreFormProps<ProtoItem>

const AddItem: React.SFC<Props> = ({ formBundle, inputBundle }) => (
  <Form submitText="Add" formBundle={formBundle}>
    <FormField name="name" type="text" inputBundle={inputBundle} />
  </Form>
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

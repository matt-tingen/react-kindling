import * as React from 'react'
import { compose } from 'recompose'
import * as yup from 'yup'
import firestoreForm, { FirestoreFormProps } from '../hocs/firestoreForm'
import withUser, { UserProps } from '../hocs/withUser'
import { ProtoItem } from '../types/Item'

type Props = FirestoreFormProps<ProtoItem>

const AddItem: React.SFC<Props> = ({ Field }) => (
  <React.Fragment>
    <Field name="name" type="text" />
  </React.Fragment>
)

export default compose(
  withUser,
  firestoreForm<ProtoItem, UserProps>('items', {
    submitText: 'Add',
    initialValues: ({ user }) => ({
      name: '',
      userId: user ? user.uid : null,
    }),
    schema: {
      name: yup.string().required(),
    },
  }),
)(AddItem)

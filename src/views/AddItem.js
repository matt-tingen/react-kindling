import React from 'react'
import { compose } from 'recompose'
import firestoreForm from '../hocs/firestoreForm'
import withUser from '../hocs/withUser'
import FormField from './FormField'

const AddItem = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <FormField name="name" component="input" type="text" />
    <button type="submit">Add</button>
  </form>
)

export default compose(
  withUser,
  firestoreForm('items', { form: 'add-item' }, (values, { user: { uid } }) => ({
    ...values,
    userId: uid,
  })),
)(AddItem)

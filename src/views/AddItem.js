import React from 'react'
import { compose } from 'recompose'
import firestoreForm from '../hocs/firestoreForm'
import withAuth from '../hocs/withAuth'
import FormField from './FormField'

const AddItem = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <FormField name="name" component="input" type="text" />
    <button type="submit">Add</button>
  </form>
)

export default compose(
  withAuth,
  firestoreForm('items', { form: 'add-item' }, (values, { auth: { uid } }) => ({
    ...values,
    userId: uid,
  })),
)(AddItem)

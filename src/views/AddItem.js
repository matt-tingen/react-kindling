import React from 'react'
import firestoreForm from '../hocs/firestoreForm'
import FormField from './FormField'

const AddItem = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <FormField name="name" component="input" type="text" />
    <button type="submit">Add</button>
  </form>
)

export default firestoreForm('items', { form: 'add-item' })(AddItem)

import React from 'react'
import { Field } from 'redux-form'
import firestoreForm from '../hocs/firestoreForm'

const AddItem = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="name">Name</label>
      <Field name="name" component="input" type="text" />
    </div>

    <button type="submit">Add</button>
  </form>
)

export default firestoreForm('items', { form: 'add-item' })(AddItem)

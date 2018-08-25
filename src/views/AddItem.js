import React from 'react'
import { compose } from 'recompose'
import firestoreForm from '../hocs/firestoreForm'
import withUser from '../hocs/withUser'
import FormField from './FormField'

const AddItem = ({ handleChange, handleSubmit, values, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <FormField
      name="name"
      type="text"
      onChange={handleChange}
      value={values.name}
    />
    <button type="submit" disabled={isSubmitting}>
      Add
    </button>
  </form>
)

export default compose(
  withUser,
  firestoreForm({
    collection: 'items',
    transform: (values, { user }) => ({
      ...values,
      userId: user ? user.uid : null,
    }),
    formik: {
      mapPropsToValues: () => ({ name: '' }),
    },
  }),
)(AddItem)

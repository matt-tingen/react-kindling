import React from 'react'
import { withFirestore } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'

const AddItem = ({ addItem }) => (
  <form onSubmit={addItem}>
    <input type="text" placeholder="Item Name" name="name" />
    <button type="submit">Add</button>
  </form>
)

export default compose(
  withFirestore,
  withHandlers({
    addItem: ({ firestore }) => event => {
      event.preventDefault()
      const formData = new FormData(event.target)
      firestore.add({ collection: 'items' }, { name: formData.get('name') })
    },
  }),
)(AddItem)

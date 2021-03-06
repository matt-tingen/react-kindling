import * as React from 'react';
import * as yup from 'yup';
import useUser from '../hooks/useUser';
import FirestoreForm from './FirestoreForm';
import FormField from './FormField';
import SubmitButton from './SubmitButton';

const AddItem: React.SFC = () => {
  const { user } = useUser()
  const formProps = {
    collection: 'items',
    initialValues: {
      name: '',
      userId: user ? user.uid : null,
    },
    schema: {
      name: yup.string().required(),
    },
  }

  return (
    <FirestoreForm {...formProps}>
      <FormField name="name" type="text" />
      <SubmitButton>Add</SubmitButton>
    </FirestoreForm>
  )
}

export default AddItem

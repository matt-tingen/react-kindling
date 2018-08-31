import * as React from 'react'
import { FormBundle } from '../hocs/firestoreForm'

interface Props {
  submitText: string
  formBundle: FormBundle
}

const Form: React.SFC<Props> = ({
  submitText,
  children,
  formBundle: { handleSubmit, isSubmitting },
}) => (
  <form onSubmit={handleSubmit}>
    {children}
    <button type="submit" disabled={isSubmitting}>
      {submitText}
    </button>
  </form>
)

export default Form

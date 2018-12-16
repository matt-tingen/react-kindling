import { useFormikContext } from 'formik'
import * as React from 'react'

const SubmitButton: React.SFC = ({ children }) => {
  const formik = useFormikContext()

  return (
    <button type="submit" disabled={formik.isSubmitting}>
      {children}
    </button>
  )
}

export default SubmitButton

import { useField } from 'formik'
import * as React from 'react'
import styled from 'react-emotion'
import titleCase from '../utils/titleCase'

const Input = styled('input')`
  margin-left: 0.5em;
`
const FieldError = styled('div')`
  color: red;
  font-weight: bold;
`

interface Props {
  label?: string
  type: string
  name: string
}

const FormField: React.SFC<Props> = ({ name, type, label }) => {
  const [field, meta] = useField(name)

  return (
    <div>
      <label>
        {label || titleCase(name)}
        <Input {...field} name={name} type={type} />
      </label>
      {meta.touch && meta.error && <FieldError>{meta.error}</FieldError>}
    </div>
  )
}

export default FormField

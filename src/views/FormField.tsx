import * as React from 'react'
import styled from 'react-emotion'
import { InputBundle } from '../hocs/firestoreForm'
import id from '../utils/id'
import titleCase from '../utils/titleCase'

const Label = styled('label')`
  margin-right: 0.5em;
`
const FieldError = styled('div')`
  color: red;
  font-weight: bold;
`

interface Props<Values> {
  label?: string
  type: string
  name: keyof Values & string
  inputBundle: InputBundle<Values>
}

class FormField<Values> extends React.Component<Props<Values>> {
  private id: string

  constructor(props: Props<Values>) {
    super(props)

    this.id = id()
  }

  render() {
    const {
      name,
      type,
      label,
      inputBundle: { handleChange, handleBlur, values, errors },
    } = this.props
    const { id } = this
    const value = values[name].toString()
    const error = errors[name] as string
    return (
      <div>
        <Label htmlFor={id}>{label || titleCase(name)}</Label>
        <input
          id={id}
          name={name}
          type={type}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
        {error && <FieldError>{error}</FieldError>}
      </div>
    )
  }
}

export default FormField

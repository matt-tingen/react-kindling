import { InjectedFormikProps } from 'formik'
import * as React from 'react'
import styled from 'react-emotion'
import id from '../../utils/id'
import titleCase from '../../utils/titleCase'

const Label = styled('label')`
  margin-right: 0.5em;
`
const FieldError = styled('div')`
  color: red;
  font-weight: bold;
`

export interface Props<Values> {
  label?: string
  type: string
  name: keyof Values & string
  formikBag: InjectedFormikProps<{}, Values>
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
      formikBag: { handleChange, handleBlur, values, errors },
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

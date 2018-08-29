import { InjectedFormikProps } from 'formik'
import * as React from 'react'
import styled from 'react-emotion'
import Omit from '../types/Omit'
import id from '../utils/id'
import titleCase from '../utils/titleCase'

const Label = styled('label')`
  margin-right: 0.5em;
`

interface OwnProps<Values> {
  label?: string
  type: string
  name: keyof Values & string
}
type UnneededProps = 'handleSubmit' | 'isSubmitting'
type Props<Values> = Omit<
  InjectedFormikProps<OwnProps<Values>, Values>,
  UnneededProps
>

class FormField<Values> extends React.Component<Props<Values>> {
  private id: string

  constructor(props: Props<Values>) {
    super(props)

    this.id = id()
  }

  render() {
    const { handleChange, handleBlur, name, type, label, values } = this.props
    const { id } = this
    const value = values[name].toString()
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
      </div>
    )
  }
}

export default FormField

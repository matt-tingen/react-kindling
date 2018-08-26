import * as React from 'react'
import styled from 'react-emotion'
import HTMLProps from '../types/HtmlProps'
import id from '../utils/id'
import titleCase from '../utils/titleCase'

const Label = styled('label')`
  margin-right: 0.5em;
`
interface Props extends HTMLProps<HTMLInputElement> {
  label?: string
}

class FormField extends React.Component<Props> {
  private id: string

  constructor(props: Props) {
    super(props)

    this.id = id()
  }

  render() {
    const { label, ...inputProps } = this.props
    const { id } = this
    return (
      <div>
        <Label htmlFor={id}>{label || titleCase(inputProps.name)}</Label>
        <input id={id} {...inputProps} />
      </div>
    )
  }
}

export default FormField

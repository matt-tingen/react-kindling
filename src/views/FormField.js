import React, { Component } from 'react'
import styled from 'react-emotion'
import id from '../utils/id'
import titleCase from '../utils/titleCase'

const Label = styled.label`
  margin-right: 0.5em;
`

class FormField extends Component {
  constructor() {
    super()
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

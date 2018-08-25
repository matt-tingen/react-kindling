import React, { Component } from 'react'
import styled from 'react-emotion'
import { Field } from 'redux-form'
import id from '../utils/id'
import titleCase from '../utils/titleCase'

const Label = styled.label`
  margin-right: 0.5em;
`

class FormField extends Component {
  componentWillMount() {
    this.id = id()
  }

  render() {
    const { label, ...fieldOptions } = this.props
    const { id } = this
    return (
      <div>
        <Label htmlFor={id}>{label || titleCase(fieldOptions.name)}</Label>
        <Field id={id} {...fieldOptions} />
      </div>
    )
  }
}

export default FormField

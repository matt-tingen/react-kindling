import styled from 'react-emotion'
import withProps from 'src/hocs/withProps'
import HTMLProps from '../types/HTMLProps'

interface Props extends HTMLProps<HTMLButtonElement> {
  type: string
  children: string
}

const MiniDeleteButton = withProps('MiniDeleteButton', {
  type: 'button',
  children: 'X',
})<Props>(styled('button')`
  margin: 10px;
  color: red;
  font-weight: bold;
`)

export default MiniDeleteButton

import styled from 'react-emotion'
import { withProps } from 'recompose'

const MiniDeleteButton = withProps({
  type: 'button',
  children: 'X',
})(styled.button`
  margin: 10px;
  color: red;
  font-weight: bold;
`)

export default MiniDeleteButton

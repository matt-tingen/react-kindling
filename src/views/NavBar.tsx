import { css } from 'emotion'
import * as React from 'react'
import styled from 'react-emotion'
import { NavLink as NavLink_ } from 'react-router-dom'
import withProps from '../hocs/withProps'

const Nav = styled('nav')`
  margin: 1em 0;
`

const activeClass = css`
  font-weight: bold;
`

const NavLink = withProps({
  activeClassName: activeClass,
})(
  styled(NavLink_)({
    marginRight: '1em',
    '&:last-child': {
      marginRight: 0,
    },
  }),
)

const NavBar: React.SFC = () => (
  <Nav>
    <NavLink to="/" exact>
      Home
    </NavLink>
    <NavLink to="/add">Add</NavLink>
    <NavLink to="/auth">Auth</NavLink>
  </Nav>
)

export default NavBar

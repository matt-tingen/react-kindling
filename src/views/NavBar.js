import { css } from 'emotion'
import React from 'react'
import styled from 'react-emotion'
import { NavLink as NavLink_ } from 'react-router-dom'
import { withProps } from 'recompose'

const Nav = styled.nav`
  margin-bottom: 1em;
`

const activeClass = css`
  font-weight: bold;
`

const NavLink = withProps({ activeClassName: activeClass })(styled(NavLink_)`
  margin-left: 1em;
`)

const NavBar = () => (
  <Nav>
    <NavLink to="/" exact>
      Home
    </NavLink>
    <NavLink to="/add">Add</NavLink>
    <NavLink to="/auth">Auth</NavLink>
  </Nav>
)

export default NavBar

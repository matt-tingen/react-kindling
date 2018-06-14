import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

const Nav = styled.nav`
  margin-bottom: 1em;
`

const NavLink = styled(Link)`
  margin-left: 1em;
`
const NavBar = () => (
  <Nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/add">Add</NavLink>
    <NavLink to="/auth">Auth</NavLink>
  </Nav>
)

export default NavBar

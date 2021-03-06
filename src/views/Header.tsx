import { css } from 'emotion'
import * as React from 'react'
import logo from './firebase.svg'

const classes = {
  logo: css`
    height: 80px;
  `,
  header: css`
    background-color: #2c384a;
    height: 150px;
    padding: 20px;
    color: white;
  `,
  title: css`
    font-size: 1.5em;
  `,
}

const Header: React.SFC = ({ children }) => (
  <header className={classes.header}>
    <img src={logo} className={classes.logo} alt="logo" />
    <h1 className={classes.title}>{children}</h1>
  </header>
)

export default Header

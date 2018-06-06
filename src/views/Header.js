import { css, keyframes } from 'emotion';
import React, { Component } from 'react';
import logo from './logo.svg';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const classes = {
  logo: css`
    animation: ${spin} infinite 20s linear;
    height: 80px;
  `,
  header: css`
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
  `,
  title: css`
    font-size: 1.5em;
  `,
};

class Header extends Component {
  render({ children }) {
    return (
      <header className={classes.header}>
        <img src={logo} className={classes.logo} alt="logo" />
        <h1 className={classes.title}>{children}</h1>
      </header>
    );
  }
}

export default Header;

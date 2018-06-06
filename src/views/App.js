import { css, keyframes } from 'emotion';
import React, { Component } from 'react';
import logo from './logo.svg';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const classes = {
  container: css`
    text-align: center;
  `,
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
  intro: css`
    font-size: large;
  `,
};

class App extends Component {
  render() {
    return (
      <div className={classes.container}>
        <header className={classes.header}>
          <img src={logo} className={classes.logo} alt="logo" />
          <h1 className={classes.title}>Welcome to React</h1>
        </header>
        <p className={classes.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

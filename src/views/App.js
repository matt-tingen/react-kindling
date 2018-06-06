import { css } from 'emotion';
import React, { Component } from 'react';
import Header from './Header';

const classes = {
  container: css`
    text-align: center;
  `,
  intro: css`
    font-size: large;
  `,
};

class App extends Component {
  render() {
    return (
      <div className={classes.container}>
        <Header>Welcome to React</Header>
        <p className={classes.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

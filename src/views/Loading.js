import _ from 'lodash'
import React, { Component } from 'react'

class Loading extends Component {
  state = {
    tick: 0,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({ tick: (prevState.tick + 1) % 4 }))
    }, 250)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render(props, { tick }) {
    return <span>Loading{_.repeat('.', tick)}</span>
  }
}

export default Loading

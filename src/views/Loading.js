import React, { Component } from 'react'
import styled from 'react-emotion'
import { withProps } from 'recompose'

const Dot = withProps({
  children: '.',
})(
  styled.span(({ visible }) => ({
    visibility: visible ? 'visible' : 'hidden',
  })),
)

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
    return (
      <span>
        Loading
        <Dot visible={tick > 0} />
        <Dot visible={tick > 1} />
        <Dot visible={tick > 2} />
      </span>
    )
  }
}

export default Loading

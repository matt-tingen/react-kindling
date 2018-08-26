import * as React from 'react'
import styled from 'react-emotion'
import withProps from '../hocs/withProps'

interface DotProps {
  visible: boolean
  children: string
}
const Dot = withProps({
  children: '.',
})(
  styled('span')<DotProps>(({ visible }) => ({
    visibility: visible ? 'visible' : 'hidden',
  })),
)

interface Props {
  interval: number
}

interface State {
  tick: number
}

class AnimatedEllipsis extends React.Component<Props, State> {
  static defaultProps = {
    interval: 250,
  }

  private interval: NodeJS.Timer

  state = {
    tick: 0,
  }

  constructor(props: Props) {
    super(props)

    this.interval = setInterval(() => {
      this.setState(prevState => ({ tick: (prevState.tick + 1) % 4 }))
    }, props.interval)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { tick } = this.state

    return (
      <span>
        <Dot visible={tick > 0} />
        <Dot visible={tick > 1} />
        <Dot visible={tick > 2} />
      </span>
    )
  }
}

export default AnimatedEllipsis

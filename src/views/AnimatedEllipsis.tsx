import * as React from 'react'
import styled from 'react-emotion'
import useTimedCounter from 'src/hooks/useTimedCounter'
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
  interval?: number
}

const AnimatedEllipsis: React.SFC<Props> = ({ interval }) => {
  const numDots = useTimedCounter(interval!, { start: 1, max: 3 })

  return (
    <span>
      <Dot visible={numDots > 0} />
      <Dot visible={numDots > 1} />
      <Dot visible={numDots > 2} />
    </span>
  )
}

AnimatedEllipsis.defaultProps = {
  interval: 250,
}

export default AnimatedEllipsis

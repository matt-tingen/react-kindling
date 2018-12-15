import { useState } from 'react'
import useInterval from './useInterval'

interface Options {
  start?: number
  max?: number
}

const useTimedCounter = (
  interval: number,
  { start = 0, max = Infinity }: Options = {},
) => {
  const [count, setCount] = useState(start)

  useInterval(() => {
    setCount(prevCount =>
      prevCount >= max || prevCount < start ? start : prevCount + 1,
    )
  }, interval)

  return count
}

export default useTimedCounter

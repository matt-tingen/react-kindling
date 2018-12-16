import { InputIdentityList, useEffect } from 'react'

const useInterval = (
  callback: Function,
  interval: number,
  inputs: InputIdentityList = [],
) => {
  useEffect(
    () => {
      const id = setInterval(callback, interval)
      return () => clearInterval(id)
    },
    [interval, ...inputs],
  )
}

export default useInterval

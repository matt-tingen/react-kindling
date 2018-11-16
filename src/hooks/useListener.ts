import { InputIdentityList, useEffect, useState } from 'react'

type ListenerCallback<T> = (value: T | void) => void
type Listener<T> = (callback: ListenerCallback<T>) => void | (() => void)
type UpdateWrapper = (updater: () => any) => (() => void)
type ListenerResult<T> = [
  T | void,
  { loading: boolean; error: any; wrapUpdater: UpdateWrapper }
]

interface State<T> {
  loading: boolean
  error?: any
  value?: T
}

const initialState: State<any> = {
  loading: false,
}

const useListener = <T>(
  listener: Listener<T>,
  inputs: InputIdentityList,
): ListenerResult<T> => {
  const [state, setState] = useState<State<T>>(initialState)
  useEffect(
    () =>
      listener(value => {
        if (value) {
          setState({ loading: false, value })
        } else {
          setState({ loading: false })
        }
      }),
    inputs,
  )

  const wrapUpdater: UpdateWrapper = updater => async () => {
    // Preserve previous state while loading update.
    setState({ ...state, loading: true })

    try {
      await updater()
    } catch (error) {
      setState({ loading: false, error })
    }
  }

  const { value, ...rest } = state
  return [value, { ...rest, wrapUpdater }] as ListenerResult<T>
}

export default useListener
